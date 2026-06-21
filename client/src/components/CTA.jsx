import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const CTA = ({ onQuoteClick }) => {
  const whatsappUrl = "https://wa.me/916201986245?text=Hello%20Imperial%20Bath%20Solutions,%20I%20am%20interested%20in%20a%20quote";

  return (
    <section className="cta max-w-6xl mx-auto px-6 py-12">
      <div className="container cta__inner bg-gradient-to-br from-[#1E1B18] to-[#12100E] text-white p-12 md:p-16 rounded-3xl relative overflow-hidden shadow-xl border border-amber-950/20 text-center flex flex-col items-center justify-center">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-700/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10 flex flex-col items-center">
          <span className="eyebrow text-xs font-semibold uppercase tracking-[0.25em] text-[#C49A45] mb-4 block">
            Start your discussion
          </span>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#FAF8F5] mb-4 leading-tight">
            Planning a Premium <span className="font-normal italic text-[#C49A45]">Wellness Project?</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 font-light max-w-lg mb-8 leading-relaxed">
            Speak with our team for a tailored quote, product advice, or WhatsApp support for your bathroom and wellness project.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button 
              className="btn btn--primary group flex items-center gap-3 bg-[#C49A45] hover:bg-[#B38934] text-neutral-950 font-medium px-8 py-4 rounded-full transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-amber-500/10" 
              onClick={onQuoteClick}
            >
              <MessageCircle size={18} className="transition-transform duration-300 group-hover:rotate-12" />
              <span className="tracking-wide text-sm">Request a quote</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-emerald-400/30 bg-gradient-to-r from-emerald-500 via-emerald-500 to-emerald-600 px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_14px_30px_-14px_rgba(16,185,129,0.9)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(16,185,129,1)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 ring-1 ring-white/15 transition-transform duration-300 group-hover:scale-105">
                <FaWhatsapp size={16} />
              </span>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
