import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { productApi } from "../api/http";
import CTA from "../components/CTA";
import ProductCard from "../components/ProductCard";
import SectionHeader from "../components/SectionHeader";
import {
  filterCatalog,
  getImmediateProducts,
  saveCachedProducts,
} from "../utils/productCatalog";

const filters = [
  { key: "all", label: "All Products" },
  { key: "bathtubs", label: "Bathtubs" },
  { key: "shower-solutions", label: "Shower Solutions" },
  { key: "wellness", label: "Wellness & Spa" },
  { key: "faucets-accessories", label: "Faucets & Accessories" },
];

const validFilterKeys = new Set(filters.map((filter) => filter.key));

const getFilterFromSearch = (search) => {
  const params = new URLSearchParams(search);
  const category = params.get("category");
  return validFilterKeys.has(category) ? category : "all";
};

const Products = ({ onQuoteClick }) => {
  const location = useLocation();
  const perPage = 6; // items per page
  const [products, setProducts] = useState(() => getImmediateProducts(getFilterFromSearch(location.search)).slice(0, perPage));
  const [activeFilter, setActiveFilter] = useState(() => getFilterFromSearch(location.search));
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);

  const locationFilter = useMemo(
    () => getFilterFromSearch(location.search),
    [location.search]
  );
  const normalizedFilter = locationFilter === activeFilter ? activeFilter : locationFilter;
  const [total, setTotal] = useState(() => getImmediateProducts(locationFilter).length);

  useEffect(() => {
    let active = true;
    const loadProducts = async () => {
      setIsFetching(true);
      try {
        const params = {
          ...(activeFilter === "all" ? {} : { category: activeFilter }),
          limit: perPage,
          page,
        };

        const response = await productApi.getProducts(params);
        if (!active) return;

        const data = Array.isArray(response.data) ? response.data : [];
        const totalCount = Number(response.headers["x-total-count"] || 0);
        setProducts((current) => {
          const nextProducts = page === 1 ? data : [...current, ...data];
          saveCachedProducts(activeFilter, nextProducts);
          return nextProducts;
        });
        setTotal(totalCount);
      } catch {
        if (!active) return;
        if (page === 1) {
          const fallback = filterCatalog(getImmediateProducts(normalizedFilter), normalizedFilter);
          setProducts(fallback);
          saveCachedProducts(normalizedFilter, fallback);
          setTotal(fallback.length);
        }
      } finally {
        if (active) {
          setIsFetching(false);
        }
      }
    };

    loadProducts();
    return () => {
      active = false;
    };
  }, [normalizedFilter, page]);

  const productsToRender = page === 1
    ? products.slice(0, perPage)
    : products;

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Product catalog</span>
          <h1>Premium Wellness Products</h1>
          <p>
            Browse bathtubs, shower solutions, wellness and spa products,
            faucets, and accessories for refined bathroom and wellness spaces.
          </p>
        </div>
      </section>

      <section id="product-catalog" className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Explore models"
            title="Premium Bath & Wellness Collection"
            text="Compare product styles, applications, and planning details before starting an enquiry."
          />
          <div className="mb-8 flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter.key}
                type="button"
                onClick={() => {
                  if (filter.key === activeFilter) return;
                  setActiveFilter(filter.key);
                  setPage(1);
                  const immediate = getImmediateProducts(filter.key);
                  setProducts(immediate.slice(0, perPage));
                  setTotal(immediate.length);
                }}
                className={`px-4 py-2 text-sm font-semibold uppercase tracking-[0.16em] transition ${activeFilter === filter.key
                  ? "bg-ink text-white"
                  : "border border-ink/15 bg-white text-ink hover:border-ink"
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {products.length > 0 ? (
            <>
              <div className="product-grid">
                {productsToRender.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id || product.slug}
                    onQuoteClick={onQuoteClick}
                  />
                ))}
              </div>

              {/* Load more */}
              {products.length < total && (
                <div className="mt-8 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setPage((p) => p + 1)}
                    disabled={isFetching}
                    className="px-6 py-3 rounded-full bg-ink text-white font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-ink/10 bg-white p-12 text-center my-6">
              <p className="text-sm font-semibold text-ink/75">
                {activeFilter !== "all"
                  ? "No Gallery added in this category"
                  : "No products are listed in our catalog at the moment. Please check back later or contact us directly."}
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
