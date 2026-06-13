import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaPlay } from "react-icons/fa";
import SectionTitle from "../components/ui/SectionTitle";
import GalleryImage from "../components/gallery/GalleryImage";
import { useData } from "../context/DataContext";

const tabs = [
  { id: "all", label: "All" },
  { id: "promotion", label: "Promotion" },
  { id: "New Branch", label: "New Branch" },
  { id: "events", label: "Events" },
  { id: "video", label: "Videos" },
];

export default function Gallery() {
  const { gallery } = useData();
  const [tab, setTab] = useState("all");
  const [lightbox, setLightbox] = useState(null);

  const filtered = useMemo(() => {
    if (tab === "all") return gallery;
    if (tab === "video") return gallery.filter((g) => g.type === "video");
    return gallery.filter((g) => g.category === tab);
  }, [tab, gallery]);

  return (
    <motion.div
      className="pt-24 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          label="Gallery"
          title="Our World in Pictures"
          subtitle="Explore our events, promotions and more"
        />

        <motion.div
          id="gallery-grid"
          className="mb-10 flex flex-wrap justify-center gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {tabs.map((t, i) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`rounded-xl px-5 py-2.5 text-sm font-medium transition ${
                tab === t.id
                  ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {t.label}
            </motion.button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <motion.p
            className="py-16 text-center text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No photos in this category yet.
          </motion.p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: (i % 6) * 0.05,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <motion.div
                  className="group relative w-full overflow-hidden rounded-2xl glass-dark"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <button
                    type="button"
                    onClick={() => setLightbox(item)}
                    className="block w-full text-left"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="aspect-square overflow-hidden"
                    >
                      <GalleryImage
                        item={item}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </motion.div>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-4"
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-medium text-white">
                        {item.title}
                      </p>
                    </motion.div>
                    {item.type === "video" && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        whileHover={{ scale: 1.2 }}
                      >
                        <motion.div
                          className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/90 text-white shadow-lg"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <FaPlay className="ml-1" />
                        </motion.div>
                      </motion.div>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-6 top-6 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaTimes className="h-6 w-6" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
              className="max-h-[90vh] max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.type === "video" ? (
                <motion.div
                  className="aspect-video w-full overflow-hidden rounded-2xl"
                  initial={{ borderRadius: 0 }}
                  animate={{ borderRadius: 16 }}
                  transition={{ duration: 0.5 }}
                >
                  <iframe
                    src={lightbox.videoUrl}
                    title={lightbox.title}
                    className="h-full w-full"
                    allowFullScreen
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <img
                    src={lightbox.image}
                    alt={lightbox.title}
                    className="max-h-[85vh] w-full rounded-2xl object-contain"
                  />
                </motion.div>
              )}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="mt-4 text-center text-lg font-semibold text-white">
                  {lightbox.title}
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
