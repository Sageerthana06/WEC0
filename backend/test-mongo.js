import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("🧪 Testing MongoDB Connection...\n");
console.log("📍 Connection String:", process.env.MONGO_URI);
console.log("─".repeat(60));

(async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ SUCCESS! Connected to MongoDB");
    console.log(`📍 Host: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🗄️  Collections:`, Object.keys(conn.connection.collections));

    await mongoose.disconnect();
    console.log("\n✅ Connection test passed!");
    process.exit(0);
  } catch (error) {
    console.log("❌ CONNECTION FAILED!");
    console.log(`Error: ${error.message}`);
    console.log("\n🔍 Troubleshooting steps:");
    console.log("1. Verify username and password are correct");
    console.log("2. Check if your IP is whitelisted (0.0.0.0/0)");
    console.log("3. Verify database 'wecnew-db' exists in MongoDB Atlas");
    console.log("4. Check if cluster is RUNNING (not paused)");
    console.log("5. Try with a VPN or different network");
    process.exit(1);
  }
})();
