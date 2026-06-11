const express = require("express");
const { Pool } = require("pg");
const app = express();
app.use(express.json());

// Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// DELETE API
app.delete("/api/gallery/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM gallery WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "தரவு கண்டறியப்படவில்லை" });
    }
    res.json({ message: "வெற்றிகரமாக நீக்கப்பட்டது" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "error" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
