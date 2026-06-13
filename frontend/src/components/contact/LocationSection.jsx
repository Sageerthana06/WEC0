import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaDirections,
  FaExpand,
  FaWhatsapp,
} from "react-icons/fa";
import AnimatedModal from "../ui/AnimatedModal";
import { useData } from "../../context/DataContext";

export default function LocationSection() {
  const { siteSettings } = useData();
  const company = siteSettings?.company || {};
  const [modalOpen, setModalOpen] = useState(false);
  const phone = company.whatsapp ? company.whatsapp.replace(/\D/g, "") : "";
  const waMessage = encodeURIComponent(
    `Hello ${company.shortName || "WEC"}, I would like to inquire about your services.`,
  );

  return (
    <>
      <section
        id="location"
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full border border-sky-400/50 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700">
              Our Location
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-800 md:text-4xl">
              Visit Our Office
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
            {/* இடது பக்கம்: தகவல்கள் மற்றும் பட்டன்கள் */}
            <motion.div className="flex flex-col justify-center space-y-5 lg:col-span-2">
              {[
                {
                  icon: FaMapMarkerAlt,
                  text: company.address || "",
                  label: "Address",
                },
                {
                  icon: FaPhone,
                  text: company.phone || "",
                  label: "Phone",
                  href: `tel:${company.phone || ""}`,
                },
                {
                  icon: FaEnvelope,
                  text: company.email || "",
                  label: "Email",
                  href: `mailto:${company.email || ""}`,
                },
                {
                  icon: FaClock,
                  text: "Mon – Sat: 8:00 AM – 4:00 PM",
                  label: "Hours",
                },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-2xl border border-sky-300/50 bg-white/70 p-4 shadow-sm backdrop-blur-sm"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-500 text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-0.5 font-medium text-slate-800 hover:text-sky-700"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className="mt-0.5 font-medium text-slate-800">
                        {item.text}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  <FaExpand /> View Full Map
                </motion.button>
                <motion.a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    company.address || "",
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-500 bg-white/80 px-6 py-3 text-sm font-semibold text-sky-700"
                >
                  <FaDirections /> Get Directions
                </motion.a>
                <motion.a
                  href={`https://wa.me/${phone}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  <FaWhatsapp /> WhatsApp
                </motion.a>
              </div>
            </motion.div>

            {/* வலது பக்கம்: மேப் பகுதி */}
            <motion.div className="group relative lg:col-span-3">
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative block h-full min-h-[320px] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl transition lg:min-h-[420px]"
              >
                <iframe
                  title="WEC Office Location"
                  src={siteSettings?.map?.embedUrl}
                  className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
                  loading="lazy"
                />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Office Location — WEC"
        size="full"
      >
        <div className="h-[480px] w-full overflow-hidden rounded-2xl border-2 border-sky-200 relative">
          <iframe
            title="WEC Full Map"
            src={siteSettings?.map?.embedUrl}
            className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
          />
        </div>
      </AnimatedModal>
    </>
  );
}
