import "dotenv/config"; // .env கோப்பை லோட் செய்ய
import pg from "pg";

const { Pool } = pg;

// Neon-ற்கான இணைப்பு அமைப்பு
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // பாதுகாப்பான SSL இணைப்புக்கு
  },
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected successfully!");
    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Error:", error.message);
    process.exit(1);
  }
};

export { pool };
export default connectDB;
