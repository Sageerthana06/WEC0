import { motion } from "framer-motion";

/**
 * Enhanced animated loading spinner using Framer Motion
 */
export default function AnimatedLoadingSpinner({ size = "md" }) {
  const sizes = {
    sm: { outer: 20, inner: 16 },
    md: { outer: 32, inner: 28 },
    lg: { outer: 48, inner: 44 },
  };

  const { outer, inner } = sizes[size];

  return (
    <div
      className="flex items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      {/* Outer rotating circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          width: outer,
          height: outer,
          border: "3px solid rgba(6, 182, 212, 0.2)",
          borderTop: "3px solid rgb(6, 182, 212)",
          borderRadius: "50%",
        }}
      />

      {/* Inner pulsing circle */}
      <motion.div
        animate={{
          scale: [0.8, 1, 0.8],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          position: "absolute",
          width: inner,
          height: inner,
          border: "2px solid rgba(6, 182, 212, 0.3)",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
