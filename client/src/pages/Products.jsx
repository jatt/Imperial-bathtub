import { useEffect, useMemo, useState } from "react";
import { productApi } from "../api/http";
import { fallbackProducts } from "../assets/placeholderData";
import CTA from "../components/CTA";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";

const filters = ["all", "jacuzzi", "sauna", "steam", "spa"];

const Products = ({ onQuoteClick }) => {
  const [products, setProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await productApi.getProducts();
        setProducts(response.data.length ? response.data : fallbackProducts);
      } catch {
        setProducts(fallbackProducts);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const visibleProducts = useMemo(() => {
    if (activeFilter === "all") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter, products]);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Product catalog</span>
          <h1>Premium Wellness Products</h1>
          <p>
            Browse jacuzzi bathtubs, sauna rooms, steam rooms, and spa products
            for refined wellness spaces.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Explore models"
            title="Product Range"
            text="Compare product styles, applications, and planning details before starting an enquiry."
          />
          {/* <div className="filter-bar">
            {filters.map((filter) => (
              <button
                className={activeFilter === filter ? "active" : ""}
                key={filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div> */}
          {isLoading ? (
            <LoadingSpinner />
          ) : visibleProducts.length > 0 ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard product={product} key={product._id || product.slug} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center my-6">
              <p className="text-sm font-semibold text-ink/75">
                No products are listed in our catalog at the moment. Please check back later or contact us directly.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTA onQuoteClick={onQuoteClick} />
    </>
  );
};

export default Products;