import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaDirections,
  FaExpand,
} from "react-icons/fa";
import AnimatedModal from "../ui/AnimatedModal";
import { COMPANY } from "../../data/initialData";

const MAP_EMBED =
  "https://www.google.com/maps/d/u/0/embed?mid=1IXoo2HTLpkdYVrEc2vZ6wkq-GmJ7ZZ0&ehbc=2E312F";

<iframe
  title="WMC Office Locations"
  src={MAP_EMBED}
  className="pointer-events-none absolute inset-0 h-full w-full border-0"
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>;

export default function LocationSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="location"
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <span className="inline-block rounded-full border border-sky-400/50 bg-white/60 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-sky-700">
              Our Location
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold text-slate-800 md:text-4xl">
              Visit Our Office
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Find us at the heart of Colombo&apos;s business district — open
              for consultations and trade inquiries.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center space-y-5 lg:col-span-2"
            >
              {[
                {
                  icon: FaMapMarkerAlt,
                  text: COMPANY.address,
                  label: "Address",
                },
                {
                  icon: FaPhone,
                  text: COMPANY.phone,
                  label: "Phone",
                  href: `tel:${COMPANY.phone}`,
                },
                {
                  icon: FaEnvelope,
                  text: COMPANY.email,
                  label: "Email",
                  href: `mailto:${COMPANY.email}`,
                },
                {
                  icon: FaClock,
                  text: "Mon – Sat: 8:00 AM – 4:00 PM",
                  label: "Hours",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
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
                </motion.div>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/30"
                >
                  <FaExpand /> View Full Map
                </motion.button>
                <motion.a
                  href={`https://maps.google.com/?q=${encodeURIComponent(COMPANY.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-500 bg-white/80 px-6 py-3 text-sm font-semibold text-sky-700"
                >
                  <FaDirections /> Get Directions
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group relative lg:col-span-3"
            >
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="relative block h-full min-h-[320px] w-full overflow-hidden rounded-3xl border-4 border-white shadow-2xl shadow-sky-500/25 transition hover:shadow-sky-500/40 lg:min-h-[420px]"
                aria-label="Open location map"
              >
                <iframe
                  title="WMC Office Location"
                  src={MAP_EMBED}
                  // className-ஐ மட்டும் மாற்றவும்:
                  className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-sky-900/0 transition group-hover:bg-sky-900/10">
                  <span className="translate-y-4 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold text-sky-700 opacity-0 shadow-lg transition group-hover:translate-y-0 group-hover:opacity-100">
                    Click to expand map
                  </span>
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <AnimatedModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Office Location — WMC"
        size="full"
      >
        <div className="space-y-5">
          <p className="text-slate-600">
            <strong className="text-slate-800">{COMPANY.name}</strong>
            <br />
            {COMPANY.address}
          </p>
          <div className="overflow-hidden rounded-2xl border-2 border-sky-200 shadow-inner">
            <div className="overflow-hidden rounded-2xl border-2 border-sky-200 shadow-inner h-[480px] relative">
              <iframe
                title="WMC Full Map"
                src={MAP_EMBED}
                // className-ஐ மட்டும் மாற்றவும்:
                className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`tel:${COMPANY.phone}`}
              className="rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-700"
            >
              Call {COMPANY.phone}
            </a>
            <a
              href="https://maps.google.com/?q=World+Trade+Center+Colombo"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border-2 border-sky-500 px-5 py-2.5 text-sm font-semibold text-sky-700 hover:bg-sky-50"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </AnimatedModal>
    </>
  );
}
