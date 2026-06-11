import { motion } from "framer-motion";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import {
  FadeInUp,
  StaggerContainer,
  StaggerItem,
  FloatingElement,
} from "../components/animations/AnimatedComponents";
import { FaGlobe, FaAward, FaHandshake, FaChartLine } from "react-icons/fa";
import { useData } from "../context/DataContext";

const achievements = [
  {
    icon: FaGlobe,
    title: "45+ Countries",
    desc: "Active trade partnerships worldwide",
  },
  {
    icon: FaAward,
    title: "ISO Certified",
    desc: "Quality management standards",
  },
  {
    icon: FaHandshake,
    title: "850+ Clients",
    desc: "Long-term business relationships",
  },
  {
    icon: FaChartLine,
    title: "18 Years",
    desc: "Industry leadership since 2008",
  },
];

export default function About() {
  const { siteSettings, team } = useData();

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.span
              className="text-sm font-semibold uppercase tracking-widest text-cyan-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              About Us
            </motion.span>
            <motion.h1
              className="mt-2 font-display text-4xl font-bold text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {siteSettings?.company?.name ||
                "World Entrepreneurs Export & Import (PVT) LTD"}
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-2xl text-slate-400"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A leading Sri Lankan company connecting local excellence with
              global opportunities.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeInUp>
              <SectionTitle
                label="Our Story"
                title="Company History"
                center={false}
              />
              <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">
                {siteSettings?.about?.history || "Company history..."}
              </p>
            </FadeInUp>
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="rounded-2xl shadow-2xl w-full aspect-square bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
            >
              <div className="text-center p-8">
                <div className="text-6xl mb-4">🏢</div>
                <p className="text-slate-400">Company Image</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <GlassCard>
                <h3 className="font-display text-2xl font-bold text-cyan-400">
                  Our Mission
                </h3>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  {siteSettings?.about?.mission || "Mission statement..."}
                </p>
              </GlassCard>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <GlassCard>
                <h3 className="font-display text-2xl font-bold text-amber-400">
                  Our Vision
                </h3>
                <p className="mt-4 text-slate-400 leading-relaxed">
                  {siteSettings?.about?.vision || "Vision statement..."}
                </p>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle
            label="Our Achievements"
            title="What We Deliver"
            subtitle="Building trust through excellence and innovation"
          />
          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {achievements.map((achievement, i) => {
              const Icon = achievement.icon;
              return (
                <StaggerItem key={i}>
                  <motion.div
                    whileHover={{ y: -8, scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <GlassCard className="text-center">
                      <div className="flex justify-center text-4xl text-cyan-400">
                        <Icon />
                      </div>
                      <h3 className="mt-4 font-semibold text-white">
                        {achievement.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-400">
                        {achievement.desc}
                      </p>
                    </GlassCard>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-slate-950/50">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle
            label="Our Team"
            title="Meet the Experts"
            subtitle="Dedicated professionals driving our success"
          />
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <GlassCard className="overflow-hidden">
                    <motion.div
                      className="h-48 w-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center overflow-hidden rounded-lg mb-4"
                      whileHover={{ scale: 1.1 }}
                    >
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                      <div
                        className="hidden w-full h-full items-center justify-center text-4xl"
                        style={{ display: "flex" }}
                      >
                        👤
                      </div>
                    </motion.div>
                    <h3 className="font-semibold text-white text-lg">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-cyan-400">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      {member.bio}
                    </p>
                  </GlassCard>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
