import { Award, Handshake, MapPin, ShieldCheck } from "lucide-react";
import CTA from "../components/CTA";
import FeatureCard from "../components/FeatureCard";
import SectionHeader from "../components/SectionHeader";
import StatsBar from "../components/StatsBar";
import { stats } from "../assets/placeholderData";

const values = [
  {
    title: "Transparent Planning",
    text: "Use this block for clear project guidance and requirement notes."
  },
  {
    title: "Reliable Execution",
    text: "Placeholder copy for installation, delivery, and service confidence."
  },
  {
    title: "Premium Finish",
    text: "A concise card for product quality and brand positioning."
  }
];

const About = ({ onQuoteClick }) => {
  return (
    // Keep the whole page on an elegant background.
    <div className="bg-[#FAF8F5] text-slate-800 min-h-screen font-sans antialiased">

      {/* SECTION 1: HERO (Centered & Controlled Width) */}
      <section className="page-hero max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="container max-w-3xl">
          <span className="eyebrow text-xs font-semibold uppercase tracking-[0.2em] text-amber-700 block mb-3">
            About Marcus Bath
          </span>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 mb-4">
            Made in India. <span className="italic font-normal">Made Well.</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            Premium wellness products shaped around thoughtful planning,
            reliable execution, and long-term service.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="max-w-6xl mx-auto px-6">
        <StatsBar items={stats} />
      </div>

      {/* SECTION 2: MISSION & VALUES (Grid Control) */}
      <section className="section max-w-6xl mx-auto px-6 py-16 border-t border-slate-200/60">
        {/* The grid keeps the header and cards balanced on desktop. */}
        <div className="container grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <div className="lg:col-span-4">
            <SectionHeader
              eyebrow="Mission and values"
              title="A Trust Page That Feels Real"
              text="Built around clear communication, practical guidance, and refined wellness outcomes."
            />
          </div>

          {/* Cards adjust into three columns on desktop. */}
          <div className="feature-grid lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((value) => (
              /* Card container with white background, light border, and subtle premium shadow. */
              <div
                key={value.title}
                className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                {/* FeatureCard renders the value content. */}
                <FeatureCard {...value} />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 3: WHY CHOOSE US (Properly Aligned Grid) */}
      <section className="section section--dark bg-white border-t border-slate-200/60 py-20">
        <div className="container max-w-6xl mx-auto px-6">

          <div className="max-w-3xl mb-12">
            <SectionHeader
              eyebrow="Why choose us"
              title="Clear Product Thinking"
              text="Every project benefits from product clarity, planning support, and dependable service."
            />
          </div>

          {/* 4 Cards structured layout instead of long stretched line */}
          <div className="trust-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <article className="p-6 bg-[#FAF8F5] rounded-xl border border-slate-200/40 flex flex-col gap-3">
              <div className="text-amber-700"><Award size={24} /></div>
              <h3 className="font-medium text-slate-900 text-base">Experience</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Placeholder for years, projects, and capability.</p>
            </article>

            <article className="p-6 bg-[#FAF8F5] rounded-xl border border-slate-200/40 flex flex-col gap-3">
              <div className="text-amber-700"><Handshake size={24} /></div>
              <h3 className="font-medium text-slate-900 text-base">Direct Support</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Placeholder for consultation and planning guidance.</p>
            </article>

            <article className="p-6 bg-[#FAF8F5] rounded-xl border border-slate-200/40 flex flex-col gap-3">
              <div className="text-amber-700"><MapPin size={24} /></div>
              <h3 className="font-medium text-slate-900 text-base">Pan India</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Placeholder for delivery and project reach.</p>
            </article>

            <article className="p-6 bg-[#FAF8F5] rounded-xl border border-slate-200/40 flex flex-col gap-3">
              <div className="text-amber-700"><ShieldCheck size={24} /></div>
              <h3 className="font-medium text-slate-900 text-base">After Care</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Placeholder for service and maintenance confidence.</p>
            </article>

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <div className="max-w-6xl mx-auto">
        <CTA onQuoteClick={onQuoteClick} />
      </div>

    </div>
  );
};

export default About;
