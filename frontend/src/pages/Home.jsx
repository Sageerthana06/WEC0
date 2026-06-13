import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import HeroSection from "../components/home/HeroSection";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import CatalogCard from "../components/ui/CatalogCard";
import AnimatedCounter from "../components/ui/AnimatedCounter";
import {
  ScrollReveal,
  FadeInUp,
  StaggerContainer,
  StaggerItem,
} from "../components/animations/AnimatedComponents";
import { useData } from "../context/DataContext";
import { partners } from "../data/initialData";

export default function Home() {
  const { services, siteSettings, stats } = useData();
  const company = siteSettings?.company || {};
  const featuredServices = services.filter((s) => s.featured).slice(0, 4);

  return (
    <>
      <HeroSection />

      {/* Services Overview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle
            label="What We Do"
            title="Our Core Services"
            subtitle="Comprehensive trade solutions tailored for global businesses"
          />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredServices.map((svc) => (
              <StaggerItem key={svc.id}>
                <CatalogCard item={svc} imageClass="aspect-[16/10]" />
              </StaggerItem>
            ))}
          </StaggerContainer>
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/services"
                className="inline-block rounded-xl border border-cyan-500/50 px-8 py-3 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500/10"
              >
                View All Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="text-center">
                    <p className="font-display text-4xl font-bold gradient-text">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </p>
                    <p className="mt-2 text-slate-400">{stat.label}</p>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-4 lg:px-8">
          <FadeInUp>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 40px rgba(25, 7, 17, 0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GlassCard className="text-center !p-12">
                <motion.h2
                  className="font-display text-3xl font-bold text-white md:text-4xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  Ready to Expand Globally?
                </motion.h2>
                <motion.p
                  className="mx-auto mt-4 max-w-xl text-slate-400"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  Partner with {company.shortName || "WEC"} for seamless export
                  and import solutions. Get a free consultation today.
                </motion.p>
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(6, 182, 212, 0.6)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/contact"
                      className="inline-block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-10 py-4 font-semibold text-white shadow-xl shadow-cyan-500/30"
                    >
                      Contact Us Now
                    </Link>
                  </motion.div>
                </motion.div>
              </GlassCard>
            </motion.div>
          </FadeInUp>
        </div>
      </section>
    </>
  );
}
