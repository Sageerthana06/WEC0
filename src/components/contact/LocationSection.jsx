import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaDirections,
  FaExpand,
  FaWhatsapp, // 1. FaWhatsapp இம்போர்ட் செய்துள்ளேன்
} from "react-icons/fa";
import AnimatedModal from "../ui/AnimatedModal";
import { COMPANY } from "../../data/initialData";

const MAP_EMBED =
  "https://www.google.com/maps/d/u/0/embed?mid=1IXoo2HTLpkdYVrEc2vZ6wkq-GmJ7ZZ0&ehbc=2E312F";

export default function LocationSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="location"
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden bg-gradient-to-b from-sky-200 to-sky-100"
      >
        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-20">
          {/* ... (உங்கள் முந்தைய கோட் அப்படியே இருக்கட்டும்) ... */}

          <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
            <motion.div className="flex flex-col justify-center space-y-5 lg:col-span-2">
              {/* ... (Address, Phone, Email, Hours பகுதிகள்) ... */}

              <div className="flex flex-wrap gap-3 pt-2">
                {/* View Full Map பட்டன் */}
                <motion.button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg"
                >
                  <FaExpand /> View Full Map
                </motion.button>

                {/* Get Directions பட்டன் */}
                <motion.a
                  href={`https://maps.google.com/?q=$`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-sky-500 bg-white/80 px-6 py-3 text-sm font-semibold text-sky-700"
                >
                  <FaDirections /> Get Directions
                </motion.a>

                {/* 2. புதிய WhatsApp பட்டன் */}
                <motion.a
                  href={`https://wa.me/+94770287429`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-green-600"
                >
                  <FaWhatsapp /> WhatsApp
                </motion.a>
              </div>
            </motion.div>

            {/* ... (மேப் பகுதி - இதில் நீங்கள் செய்த மாற்றங்கள் அப்படியே இருக்கட்டும்) ... */}
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
          {/* 3. மோடல் பகுதியில் இருந்த இரட்டை div-ஐ சரி செய்துள்ளேன் */}
          <div className="overflow-hidden rounded-2xl border-2 border-sky-200 shadow-inner h-[480px] relative">
            <iframe
              title="WMC Full Map"
              src={MAP_EMBED}
              className="absolute -top-[60px] left-0 h-[calc(100%+60px)] w-full border-0"
              loading="lazy"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* இங்கே பட்டன்களைச் சேர்க்கலாம் */}
          </div>
        </div>
      </AnimatedModal>
    </>
  );
}
