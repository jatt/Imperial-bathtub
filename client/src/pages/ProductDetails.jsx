import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { productApi } from "../api/http";
import { fallbackProducts } from "../data/siteData";
import {
  getImmediateProductBySlug,
  saveCachedProducts,
} from "../utils/productCatalog";

const categoryLabels = {
  bathtubs: "Bathtubs",
  "shower-solutions": "Shower Solutions",
  wellness: "Wellness & Spa",
  "faucets-accessories": "Faucets & Accessories",
  jacuzzi: "Bathtubs",
  sauna: "Shower Solutions",
  steam: "Wellness & Spa",
  spa: "Wellness & Spa",
};

const ProductDetails = ({ onQuoteClick }) => {
  const { slug } = useParams();
  const location = useLocation();
  const backPath = location.state?.fromPath || "/";
  const backHash = location.state?.fromHash || "";

  const [product, setProduct] = useState(() => {
    const routeProduct = location.state?.product;
    if (routeProduct && routeProduct.slug === slug) return routeProduct;
    return getImmediateProductBySlug(slug) || {
      name: slug.replace(/-/g, " "),
      slug,
      image: fallbackProducts[0]?.image || "",
      size: "N/A",
      price: "Contact for quote",
      description: "",
      category: "bathtubs",
    };
  });
  const [activeImage, setActiveImage] = useState(() => {
    const routeProduct = location.state?.product;
    const initial = routeProduct && routeProduct.slug === slug ? routeProduct : getImmediateProductBySlug(slug);
    return initial?.image || initial?.gallery?.[0] || fallbackProducts[0]?.image || "";
  });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    window.scrollTo({ top: 0, behavior: "auto" });

    const loadProduct = async () => {
      const cachedProduct = location.state?.product;
      if (cachedProduct && cachedProduct.slug === slug) {
        setProduct(cachedProduct);
        setActiveImage(cachedProduct.image || cachedProduct.gallery?.[0] || "");
      }

      const fetchWithRetry = async () => {
        try {
          const res = await productApi.getProductBySlug(slug, { related: true, relatedLimit: 3 });
          const payload = res.data;
          const data = payload.product || payload;

          if (!isMounted) return;

          setProduct(data);
          setActiveImage(data.image || data.gallery?.[0] || "");
          saveCachedProducts("all", [data, ...(Array.isArray(payload.relatedProducts) ? payload.relatedProducts : [])]);
        } catch (error) {
          if (!isMounted) return;

          console.error("API error, attempting fallback lookup:", error);


          const fallback = fallbackProducts.find((item) => item.slug === slug);
          if (fallback) {
            setProduct(fallback);
            setActiveImage(fallback.gallery?.[0] || fallback.image);
          } else {
            setProduct((current) =>
              current || {
                name: slug.replace(/-/g, " "),
                slug,
                image: fallbackProducts[0]?.image || "",
                size: "N/A",
                price: "Contact for quote",
                description: "",
                category: "bathtubs",
              }
            );
            setActiveImage((current) => current || fallbackProducts[0]?.image || "");
          }
        }
      };

      await fetchWithRetry();
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug, location.state]);

  const displayDescription = product.shortDescription || product.description || "";

  const otherPhotos = useMemo(
    () =>
      Array.from(
        new Set([product.image, ...(Array.isArray(product.gallery) ? product.gallery : [])].filter(Boolean))
      ).slice(0, 10),
    [product.image, product.gallery]
  );

  const resolvedActiveImage = useMemo(() => {
    if (!otherPhotos.length) return "";
    if (activeImage && otherPhotos.includes(activeImage)) return activeImage;
    return otherPhotos[0];
  }, [otherPhotos, activeImage]);

  const activeIndex = Math.max(0, otherPhotos.findIndex((photo) => photo === resolvedActiveImage));
  const canNavigate = otherPhotos.length > 1;
  const thumbsPerView = 3;
  const prevIndex = otherPhotos.length ? (activeIndex - 1 + otherPhotos.length) % otherPhotos.length : 0;
  const nextIndex = otherPhotos.length ? (activeIndex + 1) % otherPhotos.length : 0;

  const showPhotoByIndex = useCallback(
    (nextIndex) => {
      if (!otherPhotos.length) return;
      const bounded = (nextIndex + otherPhotos.length) % otherPhotos.length;
      const nextPhoto = otherPhotos[bounded];
      setActiveImage((current) => (current === nextPhoto ? current : nextPhoto));
    },
    [otherPhotos]
  );

  const showPrevPhoto = useCallback(() => {
    showPhotoByIndex(activeIndex - 1);
    setThumbStartIndex((current) => {
      const target = Math.max(0, activeIndex - 1);
      if (target < current) return target;
      if (target >= current + thumbsPerView) return Math.max(0, target - thumbsPerView + 1);
      return current;
    });
  }, [showPhotoByIndex, activeIndex, thumbsPerView]);

  const showNextPhoto = useCallback(() => {
    showPhotoByIndex(activeIndex + 1);
    setThumbStartIndex((current) => {
      const target = Math.min(otherPhotos.length - 1, activeIndex + 1);
      if (target < current) return target;
      if (target >= current + thumbsPerView) return Math.max(0, target - thumbsPerView + 1);
      return current;
    });
  }, [showPhotoByIndex, activeIndex, thumbsPerView, otherPhotos.length]);

  const maxThumbStart = Math.max(0, otherPhotos.length - thumbsPerView);
  const safeThumbStart = Math.min(thumbStartIndex, maxThumbStart);

  const showPrevThumbs = useCallback(() => {
    setThumbStartIndex((current) => Math.max(0, Math.min(current, maxThumbStart) - 1));
  }, [maxThumbStart]);

  const showNextThumbs = useCallback(() => {
    setThumbStartIndex((current) => Math.min(maxThumbStart, Math.min(current, maxThumbStart) + 1));
  }, [maxThumbStart]);

  const visibleThumbs = useMemo(
    () => otherPhotos.slice(safeThumbStart, safeThumbStart + thumbsPerView),
    [otherPhotos, safeThumbStart]
  );

  useEffect(() => {
    if (!otherPhotos.length) return;

    const preload = (src) => {
      if (!src) return;
      const img = new Image();
      img.decoding = "async";
      img.src = src;
    };

    const firstThree = otherPhotos.slice(0, 3);
    firstThree.forEach(preload);
    preload(otherPhotos[prevIndex]);
    preload(otherPhotos[nextIndex]);
  }, [otherPhotos, prevIndex, nextIndex]);

  return (
    <>
      {/* BACK BUTTON */}
      <section className="bg-ink py-6 text-white">
        <div className="container">
          <Link to={`${backPath}${backHash}`} className="flex items-center gap-2 w-fit">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section className="py-12 bg-gradient-to-b from-white to-ivory/50">
        <div className="container grid gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          {/* IMAGE */}
          <div className="rounded-3xl border border-ink/10 bg-white p-4 shadow-sm">
            <div className="relative overflow-hidden rounded-2xl border border-ink/10 bg-slate-50">
              <img
                src={resolvedActiveImage || product.image}
                alt={product.title || product.name}
                className="h-[460px] w-full object-contain p-4 md:h-[520px]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow hover:bg-white"
              >
                <Expand size={14} />
                Open
              </button>

              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={showPrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/85"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white transition hover:bg-black/85"
                    aria-label="Next image"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* DETAILS */}
          <div className="rounded-3xl border border-ink/10 bg-white p-7 shadow-sm">
            <p className="text-sm uppercase tracking-[0.24em] text-ink/60">
              {categoryLabels[product.category?.toLowerCase()] || "Product"}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-ink">
              {product.title || product.name}
            </h1>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-ink/10 bg-ivory p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-ink/50">
                  Size
                </p>
                <p className="mt-3 text-lg font-semibold text-ink">
                  {product.size || "N/A"}
                </p>
              </div>
              <div className="rounded-3xl border border-ink/10 bg-ivory p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-ink/50">
                  Starting Price
                </p>
                <p className="mt-3 text-lg font-semibold text-ink">
                  {product.price || "Contact for quote"}
                </p>
              </div>
            </div>

            <p className="mt-7 text-base leading-8 text-ink/75">
              {displayDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={onQuoteClick} className="btn-primary">
                Get Quote
              </button>
              <a
                href={`https://wa.me/916201986245?text=${encodeURIComponent(
                  `Hello Imperial Bath Solutions, I'm interested in ${product.title || product.name}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/20 transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-white"
              >
                <FaWhatsapp size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER PHOTOS */}
      <section className="bg-slate-50 py-12">
        <div className="container">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink">Other Photos</h2>
            {otherPhotos.length > 0 && (
              <p className="text-sm font-medium text-ink/60">
                {activeIndex + 1} / {otherPhotos.length}
              </p>
            )}
          </div>

          {otherPhotos.length > 0 ? (
            <div className="relative">
              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={showPrevThumbs}
                    disabled={safeThumbStart === 0}
                    className="absolute -left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink p-2 text-white shadow-lg transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40 md:-left-5"
                    aria-label="Previous other photos"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextThumbs}
                    disabled={safeThumbStart >= maxThumbStart}
                    className="absolute -right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink p-2 text-white shadow-lg transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-40 md:-right-5"
                    aria-label="Next other photos"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}

              <div className="grid gap-4 sm:grid-cols-3">
                {visibleThumbs.map((photo, index) => {
                  const realIndex = safeThumbStart + index;
                  return (
                    <button
                      key={`${photo}-${realIndex}`}
                      type="button"
                      onClick={() => {
                        setActiveImage((current) => (current === photo ? current : photo));
                        setThumbStartIndex((current) => {
                          if (realIndex < current) return realIndex;
                          if (realIndex >= current + thumbsPerView) return Math.max(0, realIndex - thumbsPerView + 1);
                          return current;
                        });
                      }}
                      className={`group rounded-2xl border bg-white p-2 text-left shadow-sm transition ${resolvedActiveImage === photo ? "border-gold ring-2 ring-gold/40" : "border-ink/10 hover:-translate-y-0.5 hover:shadow-md"
                        }`}
                    >
                      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-50">
                        <img
                          src={photo}
                          alt={`${product.title || product.name} photo ${realIndex + 1}`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-8 text-center text-sm font-medium text-ink/60">
              No additional photos available.
            </div>
          )}
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-ink"
            >
              Close
            </button>
            <div className="relative overflow-hidden rounded-2xl bg-white/95 p-4">
              <img
                src={resolvedActiveImage || product.image}
                alt={product.title || product.name}
                className="max-h-[80vh] w-full object-contain"
                loading="eager"
                decoding="async"
              />
              {canNavigate && (
                <>
                  <button
                    type="button"
                    onClick={showPrevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black/85"
                    aria-label="Previous lightbox image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={showNextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/70 p-2 text-white hover:bg-black/85"
                    aria-label="Next lightbox image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
