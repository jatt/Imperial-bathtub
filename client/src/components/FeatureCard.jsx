import { CheckCircle2 } from "lucide-react";

const FeatureCard = ({ title, text }) => {
  return (
    <article className="feature-card">
      <CheckCircle2 size={22} />
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
};

export default FeatureCard;