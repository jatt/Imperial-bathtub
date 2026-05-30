import { MessageCircle } from "lucide-react";

const CTA = ({ onQuoteClick }) => {
  return (
    <section className="cta max-w-6xl mx-auto px-6 py-12">
      {/* Main box with a refined dark tone and subtle blur. */}
      <div className="container cta__inner bg-gradient-to-br from-[#1E1B18] to-[#12100E] text-white p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-xl border border-amber-950/20 text-center flex flex-col items-center justify-center">
        
        {/* Decorative subtle background glow element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl pointer-events-none" />

        {/* Content Content Container */}
        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          
          {/* Eyebrow / Top tag */}
          <span className="eyebrow text-xs font-semibold uppercase tracking-[0.25em] text-[#C49A45] mb-4 block">
            Start your discussion
          </span>
          
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#FAF8F5] mb-4 leading-tight">
            Planning a Premium <span className="font-normal italic text-[#C49A45]">Wellness Project?</span>
          </h2>
          
          {/* Description Paragraph */}
          <p className="text-sm md:text-base text-neutral-400 font-light max-w-lg mb-8 leading-relaxed">
            Keep this section as your reusable call-to-action block for product,
            service, and detail pages.
          </p>
          
          {/* Premium Luxury Button */}
          <button 
            className="btn btn--primary group flex items-center gap-3 bg-[#C49A45] hover:bg-[#B38934] text-neutral-950 font-medium px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-amber-500/10" 
            onClick={onQuoteClick}
          >
            <MessageCircle size={18} className="transition-transform duration-300 group-hover:rotate-12" />
            <span className="tracking-wide text-sm">Request a quote</span>
          </button>

        </div>

      </div>
    </section>
  );
};

export default CTA;
