import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
  hover = true,
  ...props
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 300 }}
      className={`glass-dark rounded-2xl p-6 shadow-xl shadow-black/20 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
