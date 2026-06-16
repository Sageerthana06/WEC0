import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const connectDB = async (retries = 5) => {
  try {
    console.log("🔄 Connecting to PostgreSQL...");

    const client = await pool.connect();

    console.log("✅ PostgreSQL Connected");

    const result = await client.query("SELECT NOW()");
    console.log("🕒 Server Time:", result.rows[0].now);

    client.release();
  } catch (error) {
    console.error("❌ PostgreSQL Connection Error:", error.message);

    if (retries > 0) {
      console.log(`⏳ Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      return connectDB(retries - 1);
    } else {
      console.error("❌ Failed to connect to PostgreSQL after 5 attempts");
      process.exit(1);
    }
  }
};

export { pool };
export default connectDB;
