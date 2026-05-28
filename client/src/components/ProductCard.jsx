const ProductCard = ({ product }) => {
  const name = product.name || product.title || "";
  const size = product.size || product.dimension || "N/A";
  const price = product.price || product.priceLabel || "On Request";
  const description = product.description || product.shortDescription || "";

  return (
    <article className="group overflow-hidden border border-ink/10 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-luxe">
      <div className="relative aspect-[4/3] overflow-hidden bg-ink">
        <img
          src={product.image}
          alt={name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <h3 className="font-display text-2xl font-bold text-ink">{name}</h3>
        <p className="mt-2 text-sm font-semibold text-ink/80">Size: {size}</p>
        <p className="mt-1 text-sm font-semibold text-ink/80">Price: {price}</p>
        <p className="mt-3 min-h-20 text-sm leading-7 text-ink/65">{description}</p>
      </div>
    </article>
  );
};

export default ProductCard;
