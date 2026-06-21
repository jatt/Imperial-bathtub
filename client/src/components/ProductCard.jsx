import { Link } from "react-router-dom";

// Premium Product Card – uses Tailwind CSS for a sleek, responsive design.
// Features:
// • Fixed aspect‑ratio image with subtle hover zoom.
// • Top‑right price badge overlay.
// • Title, size, and truncated description.
// • Optional "Read More" link (shows on hover).
// • Accessible semantics and lazy loading.

const ProductCard = ({ product, onQuoteClick }) => {
  const name = product.name || product.title || "";
  const size = product.size || product.dimension || "N/A";
  const price = product.price || product.priceLabel || "Starting Price on Request";
  const description = product.shortDescription || product.description || "";

  // Gracefully truncate long text to roughly two lines in this design.
  const truncatedDescription = description.length > 140 ? description.slice(0, 137) + "..." : description;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
          decoding="async"
        />
        {/* Price badge */}
        <div className="absolute right-2 top-2 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-ink shadow-md">
          {price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-2xl font-bold text-ink transition-colors duration-200 group-hover:text-gold">
          {name}
        </h3>
        <p className="mt-2 text-sm font-medium text-ink/70">Size: {size}</p>
        <p className="mt-3 text-sm text-ink/65 leading-6" title={description}>
          {truncatedDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={`/products/${product.slug || product._id}`}
            state={{ product }}
            className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-ink/5"
          >
            View Details
          </Link>
          <button
            type="button"
            onClick={onQuoteClick}
            className="inline-flex items-center justify-center rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink transition hover:bg-gold/90"
          >
            Get Quote
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
