import { MessageCircle, Phone } from "lucide-react";

const FloatingActions = ({ onQuoteClick }) => {
  return (
    <div className="floating-actions">
      <a href="tel:+910000000000" className="floating-actions__button" aria-label="Call">
        <Phone size={18} />
      </a>
      <button
        className="floating-actions__button floating-actions__button--accent"
        onClick={onQuoteClick}
        aria-label="Request quote"
      >
        <MessageCircle size={18} />
      </button>
    </div>
  );
};

export default FloatingActions;