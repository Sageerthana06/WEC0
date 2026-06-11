import dotenv from "dotenv";
import { pool } from "./config/db.js";

dotenv.config();

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
    title: "Business Management",
    description:
      "Comprehensive management solutions tailored for direct marketing operations, including team coordination, sales tracking, and strategic growth planning.",
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
    title: "Skill Development",
    description:
      "Empowering entrepreneurs and corporate teams with practical training on global export-import compliance, international trade strategies, and hands-on supply chain operational skills",
    icon: "globe",
    image: "/images/skill.png",
    featured: false,
  },
];

const gallery = [
  {
    title: "Chairman",
    category: "promotion",
    image: "/photo/chairman.jpg",
    type: "image",
  },
  { title: "HR", category: "promotion", image: "/photo/hr.jpg", type: "image" },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/1.jpg",
    type: "image",
  },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/4.jpg",
    type: "image",
  },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/3.jpg",
    type: "image",
  },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/2.jpg",
    type: "image",
  },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/5.jpg",
    type: "image",
  },
  {
    title: "Manager",
    category: "promotion",
    image: "/photo/6.jpg",
    type: "image",
  },
  {
    title: "Team Photo 1",
    category: "events",
    image: "/photo/sport.jpg",
    type: "image",
  },
  {
    title: "Team Photo 2",
    category: "events",
    image: "/photo/sport2.jpg",
    type: "image",
  },
  {
    title: "Branch 1",
    category: "New Branch",
    image: "/photo/branch1.jpg",
    type: "image",
  },
  {
    title: "Branch 2",
    category: "New Branch",
    image: "/photo/branch2.jpg",
    type: "image",
  },
];

async function run() {
  try {
    const client = await pool.connect();

    console.log("🔄 Starting database seed...");

    // Create tables (idempotent)
    await client.query(`
      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT DEFAULT 'box',
        image TEXT DEFAULT '',
        featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT,
        image TEXT NOT NULL,
        type TEXT DEFAULT 'image',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT,
        message TEXT NOT NULL,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ Tables created");

    // Clear existing data
    await client.query("DELETE FROM gallery");
    await client.query("DELETE FROM services");
    console.log("🗑️  Cleared existing data");

    // Insert services
    for (const svc of services) {
      await client.query(
        "INSERT INTO services (title, description, icon, image, featured) VALUES ($1, $2, $3, $4, $5)",
        [svc.title, svc.description, svc.icon, svc.image, svc.featured],
      );
    }
    console.log(`✅ ${services.length} services seeded`);

    // Insert gallery
    for (const item of gallery) {
      await client.query(
        "INSERT INTO gallery (title, category, image, type) VALUES ($1, $2, $3, $4)",
        [item.title, item.category, item.image, item.type],
      );
    }
    console.log(`✅ ${gallery.length} gallery items seeded`);

    console.log("\n🎉 Database seeded successfully!");
    client.release();
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`);
    process.exit(1);
  }
}

run();
