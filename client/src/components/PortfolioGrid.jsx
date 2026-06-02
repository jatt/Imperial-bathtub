import { motion } from "framer-motion";
import { useMemo, useState } from "react";

const filters = ["all", "modern", "classic", "spa", ];

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
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] transition ${
              activeFilter === filter
                ? "bg-champagne text-ink"
                : "border border-white/15 text-white/70 hover:border-champagne hover:text-champagne"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <motion.article
            layout
            key={project.title}
            className="group relative aspect-[4/5] overflow-hidden bg-ink"
          >
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-champagne">
                {project.category}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {project.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioGrid;