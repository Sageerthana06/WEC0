import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const { Pool } = pg;

const app = express();

// CORS Configuration for Vercel + Local Development
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json({ limit: "50mb" }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// --- Services Routes ---
app.get("/api/services", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Services GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/services", async (req, res) => {
  try {
    const { title, description, icon, image, featured } = req.body;
    const result = await pool.query(
      "INSERT INTO services (title, description, icon, image, featured) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, description, icon || "box", image || "", featured || false],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Services POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/services/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM services WHERE id = $1", [id]);
    res.json({ message: "Service deleted" });
  } catch (err) {
    console.error("Services DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Gallery Routes ---
app.get("/api/gallery", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM gallery ORDER BY id DESC");
    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (err) {
    console.error("Gallery GET error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

app.post("/api/gallery", async (req, res) => {
  try {
    const { title, category, image, type } = req.body;
    const result = await pool.query(
      "INSERT INTO gallery (title, category, image, type) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, category || "all", image, type || "image"],
    );
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Gallery POST error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

app.delete("/api/gallery/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM gallery WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }
    res.json({
      success: true,
      message: "Gallery item deleted",
    });
  } catch (err) {
    console.error("Gallery DELETE error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
});

// --- Messages Routes ---
app.get("/api/messages", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Messages GET error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, phone, subject, message, image } = req.body;
    const result = await pool.query(
      "INSERT INTO messages (name, email, phone, subject, message, image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, email, phone || "", subject || "", message, image || ""],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Messages POST error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error("Messages DELETE error:", err);
    res.status(500).json({ error: err.message });
  }
});

// --- Admin Routes ---
app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 API Base: http://localhost:${PORT}/api`);
});
