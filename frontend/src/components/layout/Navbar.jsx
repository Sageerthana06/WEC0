import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { mainNavLinks } from "../../data/navLinks";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [extrasOpen, setExtrasOpen] = useState(false);
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  // Map பட்டனுக்கான செயல்பாடு
  const goToMap = () => {
    setExtrasOpen(false);
    if (location.pathname === "/contact") {
      document
        .getElementById("location")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/contact#location");
    }
  };

  // மெனு லிங்க்களுடன் Map-ஐ இணைத்தல்
  const allLinks = [
    ...mainNavLinks,
    { to: "", label: "Map", onClick: goToMap },
  ];

  return (
    <motion.header className="fixed inset-x-0 top-0 z-50 backdrop-blur-md bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-2 md:px-8">
        {/* லோகோ பகுதி - பெரிய அளவு */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 md:h-16 md:w-16 object-contain"
          />
        </Link>

        {/* மெனு லிங்குகள் (Home, About, ..., Map) */}
        <ul className="flex items-center gap-3 md:gap-6 mx-2">
          {allLinks.map((link) => (
            <li key={link.label}>
              {link.onClick ? (
                <button
                  onClick={link.onClick}
                  className="text-[10px] md:text-sm text-slate-300 hover:text-white whitespace-nowrap flex items-center gap-4"
                >
                  <FaMapMarkerAlt className="w-3 h-3 md:hidden" /> {link.label}
                </button>
              ) : (
                <NavLink
                  to={link.to}
                  className="text-[10px] md:text-sm text-slate-300 hover:text-white whitespace-nowrap"
                >
                  {link.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* மொபைல் மெனு பட்டன் */}
        <button
          className="text-white p-1"
          onClick={() => setExtrasOpen(!extrasOpen)}
        >
          {extrasOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
        </button>
      </nav>

      {/* மொபைல் மெனு விரிவடையும் பகுதி */}
      <AnimatePresence>
        {extrasOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-slate-900 overflow-hidden border-t border-white/10"
          >
            <ul className="flex flex-col p-4 gap-4">
              {allLinks.map((link) => (
                <li key={link.label}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-white block w-full text-left"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <Link
                      to={link.to}
                      onClick={() => setExtrasOpen(false)}
                      className="text-white block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
