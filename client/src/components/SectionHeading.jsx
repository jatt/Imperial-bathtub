const SectionHeading = ({ eyebrow, title, text, align = "left", tone = "light" }) => {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <div className={`${isCenter ? "mx-auto text-center" : ""} max-w-3xl`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2
        className={`font-display text-4xl font-bold leading-tight sm:text-5xl ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 text-base leading-8 sm:text-lg ${
            isDark ? "text-white/70" : "text-ink/65"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;