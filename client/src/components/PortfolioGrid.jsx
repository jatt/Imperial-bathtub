import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const filters = [
  { key: "all", label: "All Gallery" },
  { key: "bathtubs", label: "Bathtubs" },
  { key: "shower-solutions", label: "Shower Solutions" },
  { key: "wellness", label: "Wellness & Spa" },
  { key: "hotels-villas", label: "Hotels & Villas" },
];

const categoryLabels = {
  bathtubs: "Bathtubs",
  "shower-solutions": "Shower Solutions",
  wellness: "Wellness & Spa",
  "hotels-villas": "Hotels & Villas",
};

const PortfolioGrid = ({ projects }) => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") return projects;
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveFilter(filter.key)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${activeFilter === filter.key
              ? "bg-champagne text-ink"
              : "border border-white/15 text-white/70 hover:border-champagne hover:text-champagne"
              }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {filteredProjects.length > 0 ? (
        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <motion.article
              layout
              key={project.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink/80 shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">
                  {categoryLabels[project.category] || project.category}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </motion.article>
          ))}
        </motion.div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <p className="text-sm font-semibold text-white/85">
            No Gallery added in this category
          </p>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;