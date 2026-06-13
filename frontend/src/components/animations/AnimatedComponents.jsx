import { motion } from "framer-motion";
import { scrollReveal } from "./AnimationVariants";

/**
 * ScrollReveal - Reveals content as it comes into view
 */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
  ...props
}) {
  return (
    <motion.div
      initial={scrollReveal.initial}
      whileInView={scrollReveal.whileInView}
      exit={scrollReveal.exit}
      viewport={scrollReveal.viewport}
      transition={{ ...scrollReveal.transition, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FadeInUp - Fades in and slides up
 */
export function FadeInUp({ children, delay = 0, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer - Container for staggered child animations
 */
export function StaggerContainer({ children, className = "", ...props }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerItem - Item within a stagger container
 */
export function StaggerItem({ children, className = "", ...props }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * HoverScale - Scales on hover
 */
export function HoverScale({ children, className = "", ...props }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * FloatingElement - Floating animation
 */
export function FloatingElement({
  children,
  duration = 3,
  distance = 10,
  className = "",
  ...props
}) {
  return (
    <motion.div
      animate={{ y: [0, -distance, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseElement - Pulsing animation
 */
export function PulseElement({
  children,
  duration = 2,
  className = "",
  ...props
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * RotatingElement - Rotating animation
 */
export function RotatingElement({
  children,
  duration = 2,
  className = "",
  ...props
}) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * PageTransition - Animates page content on entry/exit
 */
export function PageTransition({ children, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * SlideIn - Slides in from the side
 */
export function SlideIn({
  children,
  direction = "left",
  delay = 0,
  className = "",
  ...props
}) {
  const initial =
    direction === "left" ? { x: -100, opacity: 0 } : { x: 100, opacity: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScaleIn - Scales in from small to normal size
 */
export function ScaleIn({ children, delay = 0, className = "", ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
