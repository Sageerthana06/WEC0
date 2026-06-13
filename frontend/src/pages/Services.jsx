import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import SectionTitle from "../components/ui/SectionTitle";
import CatalogCard from "../components/ui/CatalogCard";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations/AnimatedComponents";
import { useData } from "../context/DataContext";

export default function Services() {
  const { services } = useData();
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          s.title.toLowerCase().includes(search.toLowerCase()) ||
          s.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [services, search],
  );

  return (
    <motion.div
      className="pt-24 pb-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionTitle
          label="Services"
          title="What We Offer"
          subtitle="Complete trade and logistics solutions for your business"
        />

        <FadeInUp className="relative mx-auto mb-12 max-w-md">
          <motion.div
            animate={{
              boxShadow: [
                "0 0 0px rgba(6, 182, 212, 0)",
                "0 0 20px rgba(6, 182, 212, 0.2)",
                "0 0 0px rgba(6, 182, 212, 0)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="rounded-xl"
          >
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-dark w-full rounded-xl border border-white/10 py-3 pl-12 pr-4 text-white outline-none focus:border-cyan-500/50"
            />
          </motion.div>
        </FadeInUp>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc, i) => (
            <motion.div
              key={svc.id}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{
                delay: i * 0.05,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <CatalogCard
                item={svc}
                footer={
                  svc.featured ? (
                    <motion.span
                      className="mt-3 inline-block rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-400"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 20,
                        delay: 0.3,
                      }}
                    >
                      Featured
                    </motion.span>
                  ) : null
                }
              />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            className="text-center text-slate-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            No services match your search.
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
