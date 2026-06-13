import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import SectionTitle from "../components/ui/SectionTitle";
import GlassCard from "../components/ui/GlassCard";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ImageUpload from "../components/ui/ImageUpload";
import LocationSection from "../components/contact/LocationSection";
import {
  FadeInUp,
  FloatingElement,
} from "../components/animations/AnimatedComponents";
import { useData } from "../context/DataContext";
// No COMPANY import

export default function Contact() {
  const { addMessage, siteSettings } = useData();
  const company = siteSettings?.company || {};
  const { hash } = useLocation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (hash === "#location") {
      setTimeout(() => {
        document
          .getElementById("location")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [hash]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    addMessage(form);
    toast.success("Message sent successfully! We will contact you soon.");
    setForm({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      image: "",
    });
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const inputClass = (field) =>
    `glass-dark w-full rounded-xl border px-4 py-3 text-white outline-none transition ${
      errors[field]
        ? "border-red-500/50 focus:border-red-500"
        : "border-white/10 focus:border-cyan-500/50"
    }`;

  const phone = company.whatsapp ? company.whatsapp.replace(/\D/g, "") : "";
  const waMessage = encodeURIComponent(
    `Hello ${company.shortName || "WEC"}, I would like to inquire about your services.`,
  );

  return (
    <>
      <motion.div
        className="pt-24 pb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionTitle
            label="Contact"
            title="Get In Touch"
            subtitle="We'd love to hear from you. Send us a message anytime."
          />

          <div className="grid gap-12 lg:grid-cols-2">
            <FadeInUp>
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-5"
                noValidate
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <input
                    name="name"
                    placeholder="Your Name *"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                  )}
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </motion.div>

                <motion.input
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass("phone")}
                />

                <motion.input
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  name="subject"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass("subject")}
                />

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Your Message *"
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.message}
                    </p>
                  )}
                </motion.div>

                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <ImageUpload
                    value={form.image}
                    onChange={(url) =>
                      setForm((prev) => ({ ...prev, image: url }))
                    }
                    label="Attach photo (optional)"
                    hint="Tap to choose a photo — no link needed"
                  />
                </motion.div>

                <motion.button
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.05 }}
                  whileTap={{ scale: loading ? 1 : 0.95 }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 font-semibold text-white disabled:opacity-60"
                >
                  {loading ? <LoadingSpinner size="sm" /> : "Send Message"}
                </motion.button>
              </motion.form>
            </FadeInUp>

            <div className="space-y-6">
              <FadeInUp delay={0.1}>
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  <GlassCard>
                    <h3 className="font-display text-xl font-semibold text-white">
                      Company Details
                    </h3>
                    <ul className="mt-6 space-y-4 text-slate-400">
                      <motion.li
                        className="flex items-start gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FloatingElement duration={3} distance={5}>
                          <FaMapMarkerAlt className="mt-1 shrink-0 text-cyan-400" />
                        </FloatingElement>
                        {company.address || ""}
                      </motion.li>

                      <motion.li
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FloatingElement duration={3} distance={5}>
                          <FaPhone className="shrink-0 text-cyan-400" />
                        </FloatingElement>
                        <a
                          href={`tel:${company.phone || ""}`}
                          className="hover:text-white"
                        >
                          {company.phone || ""}
                        </a>
                      </motion.li>

                      <motion.li
                        className="flex items-center gap-3"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <FloatingElement duration={3} distance={5}>
                          <FaEnvelope className="shrink-0 text-cyan-400" />
                        </FloatingElement>
                        <a
                          href={`mailto:${company.email || ""}`}
                          className="hover:text-white"
                        >
                          {company.email || ""}
                        </a>
                      </motion.li>
                    </ul>

                    <motion.a
                      href={`https://wa.me/${phone}?text=${waMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white hover:bg-green-600"
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FloatingElement duration={2} distance={3}>
                        <FaWhatsapp className="text-xl" />
                      </FloatingElement>
                      Chat on WhatsApp
                    </motion.a>
                  </GlassCard>
                </motion.div>
              </FadeInUp>

              <FadeInUp delay={0.2}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }}>
                  <GlassCard>
                    <h3 className="mb-4 font-semibold text-white">Follow Us</h3>
                    <div className="flex gap-3">
                      {[
                        { icon: FaFacebookF, href: company.social?.facebook },
                        { icon: FaLinkedinIn, href: company.social?.linkedin },
                        { icon: FaInstagram, href: company.social?.instagram },
                        { icon: FaTwitter, href: company.social?.twitter },
                      ].map(({ icon: Icon, href }, i) => (
                        <motion.a
                          key={i}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 hover:text-cyan-400"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 10,
                            backgroundColor: "rgba(6, 182, 212, 0.1)",
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon />
                        </motion.a>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              </FadeInUp>

              <FadeInUp delay={0.3}>
                <motion.a
                  href="#location"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(56, 189, 248, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-sky-400/40 bg-sky-500/10 px-6 py-4 text-sm font-semibold text-sky-300 transition hover:bg-sky-500/20"
                >
                  <FloatingElement duration={2} distance={3}>
                    <FaMapMarkerAlt />
                  </FloatingElement>
                  Scroll to full location map below
                </motion.a>
              </FadeInUp>
            </div>
          </div>
        </div>
      </motion.div>

      <LocationSection />
    </>
  );
}
