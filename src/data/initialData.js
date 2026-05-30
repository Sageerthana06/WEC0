export const images = {
  hero: {
    path: "/logo.png",
    alt: "Warehouse background",
  },
};

export const COMPANY = {
  name: "Connecting Business Opportunities",
  shortName: "WMC",
  tagline: "World Entrepreneurs Export & Import (PVT) LTD",
  email: "Worldentrepreneurs78@gmail.com",
  phone: "+94217223317",
  whatsapp: "+94770287429",
  address: "No.348, Stanly Road, Jaffna, Sri Lanka",
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61581285864582",
    linkedin: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
  },
};

/** Services — id, title, description, icon, image, featured */
export const initialServices = [
  {
    id: 1,
    title: "Promotion (Manager)",
    description:
      "Providing an accelerated career path where hard-working individuals can fast-track their growth to become a Manager in a short period. This module focuses on monitoring performance metrics, recognizing leadership potential early, and granting rapid promotions to deserving candidates who drive company sales and team success.",
    icon: "ship",
    image: "/images/promotion.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Owen Business",
    description:
      "Comprehensive training and mentorship designed to help you launch your own business, upgrade your entrepreneurial skills, and successfully navigate global supply chains",
    icon: "delivery",
    image: "/images/1.png",
    featured: true,
  },
  {
    id: 3,
    title: "Money Management",
    description:
      "Efficiently tracking and managing daily cash flows, direct sales revenues, and company expenses. This module handles the processing of field agent commissions, managing promotional budgets, and generating real-time financial reports to ensure profitability and transparent financial operations.",
    icon: "truck",
    image: "/images/money-management.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Business Managment",
    description:
      "Comprehensive management solutions tailored for direct marketing operations, including team coordination, sales tracking, and strategic growth planning..",
    icon: "warehouse",
    image: "/images/business-management.jpg",
    featured: false,
  },
  {
    id: 5,
    title: "Human Resource Management",
    description:
      "A service to coordinate marketing teams and leaders, aligning their skills with company growth.",
    icon: "document",
    image: "/images/hrm.png",
    featured: true,
  },
  {
    id: 6,
    title: "skill-development",
    description:
      "Empowering entrepreneurs and corporate teams with practical training on global export-import compliance, international trade strategies, and hands-on supply chain operational skills",
    icon: "globe",
    image: "/images/skill.png",
    featured: false,
  },
];

/** Products — same base fields + price & stock */

/** Gallery — same base fields + category & type */
/** Gallery — same base fields + category & type */
export const initialGallery = [
  {
    id: "g1",
    title: "Our Operational Warehouse",
    category: "warehouse", // tabs-இல் உள்ள "warehouse" உடன் பொருந்தும்
    image: "/images/gal-1.jpg", // public/images/க்குள் இருக்கும் சரியான பெயர்
    type: "image",
  },
  {
    id: "g2",
    title: "Premium Quality Products",
    category: "products", // tabs-இல் உள்ள "products" உடன் பொருந்தும்
    image: "/images/gal-2.jpg",
    type: "image",
  },
  {
    id: "g3",
    title: "Entrepreneurs Network Event",
    category: "events", // tabs-இல் உள்ள "events" உடன் பொருந்தும்
    image: "/images/gal-3.jpg",
    type: "image",
  },
  {
    id: "g4",
    title: "Official Training Session",
    category: "events",
    image: "/images/gal-4.jpg",
    type: "image",
  },
];

export const testimonials = [
  {
    id: 1,
    name: "James Mitchell",
    role: "Import Director, UK",
    text: "WMC streamlined our entire import process. Professional, transparent, and always on schedule.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "CEO, Spice Traders India",
    text: "Their customs clearance expertise saved us weeks. A trusted partner for South Asian trade.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    name: "Ahmed Al-Rashid",
    role: "Logistics Manager, UAE",
    text: "From cargo handling to distribution — WMC delivers end-to-end excellence every time.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
  },
];

export const faqs = [
  {
    q: "What countries do you export to?",
    a: "We serve clients across Europe, Middle East, Asia-Pacific, and North America with tailored export solutions.",
  },
  {
    q: "How long does customs clearance take?",
    a: "Typically 2–5 business days depending on documentation and product category. We prioritize fast clearance.",
  },
  {
    q: "Do you offer trade consulting for new exporters?",
    a: "Yes. Our trade consulting team guides market entry, compliance, and partner matching for first-time exporters.",
  },
  {
    q: "Can I track my shipment?",
    a: "All clients receive real-time shipment updates via email and our dedicated account managers.",
  },
];

export const partners = [
  "Maersk",
  "DHL",
  "Colombo Port",
  "Sri Lanka Customs",
  "Trade Chamber",
  "ISO Certified",
];

export const team = [
  {
    name: "Rajesh Fernando",
    role: "CEO & Founder",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
  },
  {
    name: "Nimali Perera",
    role: "Operations Director",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
  },
  {
    name: "David Chen",
    role: "International Trade Head",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
  },
  {
    name: "Sarah Williams",
    role: "Logistics Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  },
];

export const stats = [
  { label: "Countries Served", value: 45, suffix: "+" },
  { label: "Shipments Delivered", value: 12000, suffix: "+" },
  { label: "Happy Clients", value: 850, suffix: "+" },
  { label: "Years Experience", value: 18, suffix: "" },
];
