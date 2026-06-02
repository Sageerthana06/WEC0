import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { FaMoon, FaSun, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { COMPANY } from "../../data/initialData";
import { mainNavLinks } from "../../data/navLinks";

// 1. ADD THIS IMPORT LINE:
import logo from "../../assets/logo.jpg";

const linkClass = (isActive, compact = false) =>
  `relative shrink-0 whitespace-nowrap font-medium transition-colors ${
    compact
      ? "px-1.5 py-1.5 text-[10px] sm:px-2 sm:text-[11px]"
      : "px-2.5 py-2 text-[13px] lg:px-3 lg:text-sm"
  } ${isActive ? "text-cyan-400" : "text-slate-300 hover:text-white"}`;

const NavItem = ({ to, label, end, compact }) => (
  <li className="shrink-0">
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group block ${linkClass(isActive, compact)}`
      }
    >
      {({ isActive }) => (
        <>
          {label}
          <motion.span
            initial={false}
            animate={{
              width: isActive ? "100%" : "0%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-cyan-400 group-hover:w-2/3`}
          />
        </>
      )}
    </NavLink>
  </li>
);

export default function Navbar() {
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setExtrasOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  // சரிசெய்யப்பட்ட இடம்: இங்குதான் return ( சேர்க்கப்பட்டுள்ளது
  return (
    <motion.header
      animate={{
        backgroundColor: scrolled
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(6, 15, 34, 0.6)",
        boxShadow: scrolled
          ? "0 10px 30px rgba(0, 0, 0, 0.4)"
          : "0 0px 0px rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-0 z-50 backdrop-blur-md"
    >
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center gap-1.5 px-2 sm:gap-2 sm:px-4 md:h-16 lg:px-8"
        aria-label="Main navigation"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex shrink-0 items-center gap-4">
            <motion.img
              src={logo}
              alt="Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
            <span className="hidden whitespace-nowrap font-display text-lg font-bold text-white md:block">
              World Entrepreneurs Export & Import (PVT) LTD
            </span>
          </Link>
        </motion.div>

        <motion.div
          className="min-w-0 flex-1 overflow-x-auto scrollbar-hide"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ul className="flex flex-row items-center justify-start gap-3 pr-2 md:justify-center">
            {mainNavLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 1, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              >
                <NavItem {...link} compact />
              </motion.div>
            ))}
            <li className="shrink-0 md:hidden">
              <motion.button
                type="button"
                onClick={goToMap}
                className={`${linkClass(false, true)} text-sky-300`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Map
              </motion.button>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="hidden shrink-0 items-center gap-2 md:flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.button
            type="button"
            onClick={goToMap}
            className="flex items-center gap-1 whitespace-nowrap px-2 py-2 text-sm font-medium text-sky-300 hover:text-sky-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <FaMapMarkerAlt className="h-3.5 w-3.5 text-sky-400" />
            </motion.div>
            Map
          </motion.button>
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:text-white"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              {darkMode ? (
                <FaSun className="h-5 w-5" />
              ) : (
                <FaMoon className="h-5 w-5" />
              )}
            </motion.div>
          </motion.button>
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(63, 11, 234, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link
              to="/contact"
              className="block rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25"
            >
              Contact
            </Link>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          className="flex shrink-0 rounded-lg border border-white/10 bg-white/5 p-2 text-white md:hidden"
          onClick={() => setExtrasOpen(!extrasOpen)}
          aria-expanded={extrasOpen}
          aria-label="More options"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ rotate: extrasOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {extrasOpen ? (
              <HiX className="h-5 w-5" />
            ) : (
              <HiMenuAlt3 className="h-5 w-5" />
            )}
          </motion.div>
        </motion.button>
      </nav>

      <AnimatePresence>
        {extrasOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="border-t border-white/10 bg-slate-950/95 backdrop-blur-xl md:hidden"
          >
            <motion.ul
              className="flex flex-col gap-0.5 px-3 py-3"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-2.5 text-sm font-medium ${isActive ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300"}`
                  }
                >
                  Contact
                </NavLink>
              </motion.li>
              <motion.li
                className="flex gap-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
              >
                <motion.button
                  type="button"
                  onClick={toggleTheme}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-sm text-slate-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {darkMode ? <FaSun /> : <FaMoon />} Theme
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-1"
                >
                  <Link
                    to="/contact"
                    className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-sm font-semibold text-white"
                  >
                    Get Quote
                  </Link>
                </motion.div>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
