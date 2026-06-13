import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { footerNavLinks } from "../../data/navLinks";
import { useData } from "../../context/DataContext";

export default function Footer() {
  const { siteSettings } = useData();
  const company = siteSettings?.company || {};

  return (
    <footer className="border-t border-white/10 bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 font-display text-lg font-bold text-white">
                W
              </div>
              <span className="font-display font-bold text-white">
                {company.shortName || "WEC"}
              </span>
            </div>
            <p className="text-sm text-slate-400">{company.name || ""}</p>
            <p className="mt-2 text-sm text-slate-500">{company.tagline || ""}</p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-400 transition hover:text-cyan-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 shrink-0 text-cyan-400" />
                {company.address || ""}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="shrink-0 text-cyan-400" />
                {company.phone || ""}
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="shrink-0 text-cyan-400" />
                {company.email || ""}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: FaFacebookF, href: company.social?.facebook },
                { icon: FaLinkedinIn, href: company.social?.linkedin },
                { icon: FaInstagram, href: company.social?.instagram },
                { icon: FaTwitter, href: company.social?.twitter },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-10 w-10 items-center justify-center rounded-lg text-slate-400 transition hover:bg-cyan-500/20 hover:text-cyan-400"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {company.name || "WEC"}. All rights reserved.</p>
          <Link to="/admin/login" className="mt-4 md:mt-0 hover:text-cyan-400 transition">
            Admin Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
