import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { productApi } from "../api/http";
import { fallbackProducts } from "../data/siteData";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductDetails = () => {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading and smooth scroll on slug change
    setIsLoading(true);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const loadProduct = async () => {
      try {
        const res = await productApi.getProduct(slug);
        const data = res.data;

        setProduct(data);
        setActiveImage(data.gallery?.[0] || data.image);
      } catch (error) {
        console.error("API error, attempting fallback lookup:", error);
        
        // Find the specific matching fallback product
        const fallback = fallbackProducts.find((item) => item.slug === slug);

        if (fallback) {
          setProduct(fallback);
          setActiveImage(fallback.gallery?.[0] || fallback.image);
        } else {
          // No match found anywhere: trigger the "Not found" screen
          setProduct(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return fallbackProducts
      .filter((item) => item.slug !== product.slug)
      .slice(0, 3);
  }, [product]);

  // LOADING
  if (isLoading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner label="Loading product..." />
      </main>
    );
  }

  // NOT FOUND
  if (!product) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link to="/" className="btn-primary mt-4">
          Back Home
        </Link>
      </main>
    );
  }

  const gallery = product.gallery?.length
    ? product.gallery
    : [product.image];

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
              src={activeImage}
              alt={product.title}
              className="w-full h-[400px] object-contain rounded bg-white border"
            />

            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {gallery.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 object-cover cursor-pointer border-2 rounded transition-all ${
                    activeImage === img 
                      ? "border-blue-600 opacity-100" 
                      : "border-gray-200 opacity-60 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="mt-4 text-gray-600 leading-relaxed">{product.description}</p>

            <button className="btn-primary mt-6">
              Request Quote
            </button>
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
              <Link key={item.slug} to={`/product/${item.slug}`} className="group">
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