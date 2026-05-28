import { motion } from "framer-motion";

const AnimatedSection = ({ children, className = "", id }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      viewport={{ once: true, margin: "-90px" }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;