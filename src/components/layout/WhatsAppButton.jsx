import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { COMPANY } from "../../data/initialData";

export default function WhatsAppButton() {
  const phone = COMPANY.whatsapp.replace(/\D/g, "");
  const message = encodeURIComponent(
    `Hello ${COMPANY.shortName}, I would like to inquire about your services.`,
  );
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-2xl text-white shadow-lg shadow-green-500/40"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </motion.a>
  );
}
