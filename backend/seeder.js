import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Service from "./models/Service.js";
import Gallery from "./models/Gallery.js";
import Admin from "./models/Admin.js";

dotenv.config();

// ─── Seed Data (matches your frontend initialData.js) ──────────────────────

const services = [
  {
    title: "Promotion (Manager)",
    description:
      "Providing an accelerated career path where hard-working individuals can fast-track their growth to become a Manager in a short period. This module focuses on monitoring performance metrics, recognizing leadership potential early, and granting rapid promotions to deserving candidates who drive company sales and team success.",
    icon: "ship",
    image: "/images/promotion.jpg",
    featured: true,
  },
  {
    title: "Owen Business",
    description:
      "Comprehensive training and mentorship designed to help you launch your own business, upgrade your entrepreneurial skills, and successfully navigate global supply chains",
    icon: "delivery",
    image: "/images/1.png",
    featured: true,
  },
  {
    title: "Money Management",
    description:
      "Efficiently tracking and managing daily cash flows, direct sales revenues, and company expenses. This module handles the processing of field agent commissions, managing promotional budgets, and generating real-time financial reports to ensure profitability and transparent financial operations.",
    icon: "truck",
    image: "/images/money-management.jpg",
    featured: true,
  },
  {
    title: "Business Managment",
    description:
      "Comprehensive management solutions tailored for direct marketing operations, including team coordination, sales tracking, and strategic growth planning..",
    icon: "warehouse",
    image: "/images/business-management.jpg",
    featured: false,
  },
  {
    title: "Human Resource Management",
    description:
      "A service to coordinate marketing teams and leaders, aligning their skills with company growth.",
    icon: "document",
    image: "/images/hrm.png",
    featured: true,
  },
  {
    title: "skill-development",
    description:
      "Empowering entrepreneurs and corporate teams with practical training on global export-import compliance, international trade strategies, and hands-on supply chain operational skills",
    icon: "globe",
    image: "/images/skill.png",
    featured: false,
  },
];

const gallery = [
  { title: "Chairman", category: "promotion", image: "/photo/chairman.jpg", type: "image" },
  { title: "HR", category: "promotion", image: "/photo/hr.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/1.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/4.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/3.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/2.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/5.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/6.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/7.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/8.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/9.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/10.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/11.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/12.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/13.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/14.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/15.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/16.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/17.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/18.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/19.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/20.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/21.jpg", type: "image" },
  { title: "Team Photo 21", category: "events", image: "/photo/sport.jpg", type: "image" },
  { title: "Team Photo 22", category: "events", image: "/photo/sport2.jpg", type: "image" },
  { title: "Team Photo 23", category: "New Branch", image: "/photo/branch1.jpg", type: "image" },
  { title: "Team Photo 24", category: "New Branch", image: "/photo/branch2.jpg", type: "image" },
  { title: "Team Photo 25", category: "New Branch", image: "/photo/branch3.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/a.jpg", type: "image" },
  { title: "Maanager", category: "promotion", image: "/photo/b.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/c.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/d.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/e.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/f.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/g.jpg", type: "image" },
  { title: "Manager", category: "promotion", image: "/photo/h.jpg", type: "image" },
  { title: "Manager", category: "events", image: "/photo/j.jpg", type: "image" },
];

// ─── Seed Function ──────────────────────────────────────────────────────────

const seedDB = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Service.deleteMany();
    await Gallery.deleteMany();

    console.log("🗑️  Cleared existing data");

    // Insert seed data
    const createdServices = await Service.insertMany(services);
    console.log(`✅ ${createdServices.length} services seeded`);

    const createdGallery = await Gallery.insertMany(gallery);
    console.log(`✅ ${createdGallery.length} gallery items seeded`);

    // Create default admin if none exists
    const adminExists = await Admin.countDocuments();
    if (adminExists === 0) {
      const admin = await Admin.create({
        name: "Admin",
        email: "admin@wec.com",
        password: "admin123",
        role: "superadmin",
      });
      console.log(`✅ Default admin created: ${admin.email} / admin123`);
    } else {
      console.log("ℹ️  Admin already exists, skipping admin seed");
    }

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`);
    process.exit(1);
  }
};

// ─── Destroy Function ───────────────────────────────────────────────────────

const destroyDB = async () => {
  try {
    await connectDB();
    await Service.deleteMany();
    await Gallery.deleteMany();
    console.log("🗑️  All data destroyed");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Run: node seeder.js         → seed data
// Run: node seeder.js -d      → destroy data
if (process.argv[2] === "-d") {
  destroyDB();
} else {
  seedDB();
}
