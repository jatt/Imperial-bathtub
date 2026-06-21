import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { productApi } from "../api/http";
import { fallbackProducts } from "../data/siteData";
import {
  getImmediateProductBySlug,
  getImmediateRelatedProducts,
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
  const [relatedProducts, setRelatedProducts] = useState(() =>
    Array.isArray(location.state?.relatedProducts) && location.state?.product?.slug === slug
      ? location.state.relatedProducts
      : getImmediateRelatedProducts(slug, 3)
  );
  const [fetchError, setFetchError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setFetchError("");
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadProduct = async () => {
      const cachedProduct = location.state?.product;
      if (cachedProduct && cachedProduct.slug === slug) {
        setProduct(cachedProduct);
        setActiveImage(cachedProduct.image || cachedProduct.gallery?.[0] || "");
        setRelatedProducts(location.state?.relatedProducts || []);
      }

      const fetchWithRetry = async (attempt = 1) => {
        try {
          const res = await productApi.getProduct(slug, { related: true, relatedLimit: 3 });
          const payload = res.data;
          const data = payload.product || payload;

          if (!isMounted) return;

          setProduct(data);
          setActiveImage(data.image || data.gallery?.[0] || "");
          setRelatedProducts(Array.isArray(payload.relatedProducts) ? payload.relatedProducts : []);
          saveCachedProducts("all", [data, ...(Array.isArray(payload.relatedProducts) ? payload.relatedProducts : [])]);
          setFetchError("");
        } catch (error) {
          if (!isMounted) return;

          console.error("API error, attempting fallback lookup:", error);

          if (attempt === 1 && error.code === "ECONNABORTED") {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return fetchWithRetry(2);
          }

          const fallback = fallbackProducts.find((item) => item.slug === slug);
          if (fallback) {
            setProduct(fallback);
            setActiveImage(fallback.gallery?.[0] || fallback.image);
            setRelatedProducts(fallbackProducts.filter((item) => item.slug !== slug).slice(0, 3));
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
            setRelatedProducts([]);
          }

          setFetchError(
            error.code === "ECONNABORTED"
              ? "The product API timed out. Please try again after a moment."
              : "Unable to load product details. Please refresh the page or try again."
          );
        }
      };

      await fetchWithRetry();
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [slug, retryCount, location.state]);

  const displayDescription = product.shortDescription || product.description || "";

  return (
    <>
      {/* BACK BUTTON */}
      <section className="bg-ink py-6 text-white">
        <div className="container">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <ArrowLeft size={16} /> Back
          </Link>
        </div>
      </section>

      {/* PRODUCT DETAIL */}
      <section className="py-10">
        <div className="container grid md:grid-cols-2 gap-10">
          
          {/* IMAGE */}
          <div>
            <img
              src={activeImage || product.image}
              alt={product.title || product.name}
              className="w-full h-[500px] object-cover rounded bg-white border"
            />
          </div>

          {/* DETAILS */}
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-ink/60">
              {categoryLabels[product.category?.toLowerCase()] || "Product"}
            </p>
            <h1 className="mt-4 text-4xl font-bold text-ink">
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

            <p className="mt-8 text-gray-600 leading-relaxed">
              {displayDescription}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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

      {/* RELATED PRODUCTS */}
      <section className="py-10 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">
            Related Products
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.slug} to={`/products/${item.slug}`} className="group">
                <div className="border bg-white p-4 rounded h-full transition-shadow group-hover:shadow-md">
                  <div className="h-48 flex items-center justify-center overflow-hidden rounded bg-gray-50">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
