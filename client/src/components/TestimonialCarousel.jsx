import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useMemo, useState } from "react";

const TestimonialCarousel = ({ testimonials }) => {
  const [index, setIndex] = useState(0);
  const active = testimonials[index] || testimonials[0];

  const controls = useMemo(
    () => ({
      previous: () =>
        setIndex((current) =>
          current === 0 ? Math.max(testimonials.length - 1, 0) : current - 1
        ),
      next: () =>
        setIndex((current) =>
          current === testimonials.length - 1 ? 0 : current + 1
        )
    }),
    [testimonials.length]
  );

  if (!active) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
      <div className="relative min-h-96 overflow-hidden bg-ink">
        <AnimatePresence mode="wait">
          <motion.img
            key={active.image}
            src={active.image}
            alt={active.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 to-transparent" />
      </div>

      <div className="bg-ink p-7 text-white sm:p-10 lg:p-12">
        <div className="flex gap-1 text-champagne">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <Star key={starIndex} size={18} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active._id || active.name}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
          >
            <p className="mt-8 font-display text-3xl font-bold leading-snug sm:text-4xl">
              "{active.review}"
            </p>
            <div className="mt-8">
              <p className="text-lg font-bold">{active.name}</p>
              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/45">
                {active.role} / {active.location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <div className="text-sm font-bold uppercase tracking-[0.24em] text-champagne">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(testimonials.length).padStart(2, "0")}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={controls.previous}
              aria-label="Previous testimonial"
              className="grid h-11 w-11 place-items-center border border-white/20 transition hover:border-champagne hover:text-champagne"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              onClick={controls.next}
              aria-label="Next testimonial"
              className="grid h-11 w-11 place-items-center border border-white/20 transition hover:border-champagne hover:text-champagne"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;