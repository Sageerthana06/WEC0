import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaPlay } from "react-icons/fa";
import { useData } from "../../context/DataContext";

const slides = [
  "https://images.unsplash.com/photo-1494412574647-9c33ee5b0e9e?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&h=1080&fit=crop",
  "https://images.unsplash.com/photo-1601584111127-372b9a68d1fb?w=1920&h=1080&fit=crop",
];

export default function HeroSection() {
  const { siteSettings } = useData();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setSlide((s) => (s + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <AnimatePresence mode="wait">
        {slides.map(
          (src, i) =>
            i === slide && (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0"
              >
                <img src={src} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950" />
              </motion.div>
            ),
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl"
        >
          <span className="mb-4 inline-block rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-400">
            {siteSettings?.company?.name || "Connecting Business Opportunities"}
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            <span className="gradient-text">{siteSettings?.home?.heroTagline || "World Entrepreneurs Export & Import (PVT) LTD"}</span>
          </h1>
          <p className="mt-6 text-lg text-slate-300 md:text-xl">
            {siteSettings?.home?.heroSubtitle || "Connecting Sri Lanka to the world through premium export, import, logistics, and trade consulting services."}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-xl shadow-cyan-500/30 transition hover:opacity-90"
            >
              Request a Quote <FaArrowRight />
            </Link>
            <Link
              to="/services"
              className="glass inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              <FaPlay className="text-cyan-400" /> Our Services
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSlide(i)}
              className={`h-2 rounded-full transition-all ${
                i === slide ? "w-8 bg-cyan-400" : "w-2 bg-white/40"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
