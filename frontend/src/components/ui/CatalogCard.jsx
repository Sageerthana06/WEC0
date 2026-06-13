import { motion } from "framer-motion";
import GlassCard from "./GlassCard";
import ServiceIcon from "./ServiceIcon";
import { getImage, getTitle } from "../../data/catalogTypes";

/**
 * Unified card for service / product / gallery items
 */
export default function CatalogCard({
  item,
  onClick,
  badge,
  footer,
  imageClass = "aspect-[4/3]",
  showIconOverlay = true,
}) {
  const title = getTitle(item);
  const image = getImage(item);

  return (
    <GlassCard
      className={`overflow-hidden !p-0 ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      hover={Boolean(onClick)}
    >
      <motion.div
        className={`relative overflow-hidden ${imageClass}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
            loading="lazy"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <motion.div
            className="flex h-full min-h-[160px] items-center justify-center bg-slate-800"
            whileHover={{ backgroundColor: "rgb(30, 41, 59)" }}
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ServiceIcon
                name={item.icon}
                className="h-12 w-12 text-cyan-400"
              />
            </motion.div>
          </motion.div>
        )}
        {showIconOverlay && item.icon && image && (
          <motion.div
            className="absolute left-3 top-3 rounded-lg bg-black/50 p-2 text-cyan-400 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.15,
              boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ServiceIcon name={item.icon} className="h-5 w-5" />
          </motion.div>
        )}
        {badge}
      </motion.div>
      <motion.div
        className="p-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <h3 className="font-display text-lg font-semibold text-white">
          {title}
        </h3>
        {item.description && (
          <p className="mt-2 line-clamp-2 text-sm text-slate-400">
            {item.description}
          </p>
        )}
        {footer}
      </motion.div>
    </GlassCard>
  );
}
