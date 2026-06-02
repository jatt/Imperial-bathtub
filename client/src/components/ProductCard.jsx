import { Link } from "react-router-dom";

// Premium Product Card – uses Tailwind CSS for a sleek, responsive design.
// Features:
// • Fixed aspect‑ratio image with subtle hover zoom.
// • Top‑right price badge overlay.
// • Title, size, and truncated description.
// • Optional "Read More" link (shows on hover).
// • Accessible semantics and lazy loading.

const ProductCard = ({ product }) => {
  const name = product.name || product.title || "";
  const size = product.size || product.dimension || "N/A";
  const price = product.price || product.priceLabel || "On Request";
  const description = product.description || product.shortDescription || "";

  // Gracefully truncate a long description to 3 lines using line‑clamp (Tailwind plugin).
  const truncatedDescription = description.length > 180 ? description.slice(0, 177) + "..." : description;

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
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
        <p className="mt-3 text-sm text-ink/65 leading-6 line-clamp-3" title={description}>
          {truncatedDescription}
        </p>
        {/* Optional link to product details – shown on hover for better UX */}
        <Link
          to={`/products/${product._id}`}
          className="mt-4 inline-block text-sm font-medium text-gold underline opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default ProductCard;


