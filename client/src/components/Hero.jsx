import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { placeholderImages } from "../assets/placeholderData";

const Hero = ({ onQuoteClick }) => {
  return (
    <section className="hero">
      <img src={placeholderImages.hero} alt="Luxury wellness interior" />
      <div className="hero__overlay" />
      <div className="container hero__content fade-in">
        <span className="eyebrow">Modern wellness spaces</span>
        <h1>Luxury Wellness Redefined</h1>
        <p>
          Premium bathtubs, spa, sauna, and wellness spaces planned with refined
          materials and practical project guidance.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={onQuoteClick}>
            Request quote <ArrowRight size={18} />
          </button>
          <Link className="btn btn--ghost" to="/contact">
            <Phone size={18} />
            Talk to an expert
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;