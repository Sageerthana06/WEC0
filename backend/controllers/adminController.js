import { pool } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/auth.js";

// @desc    Register admin (first-time setup only)
// @route   POST /api/admin/register
// @access  Public (only when no admins exist)
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if any admins exist
    const checkQuery = "SELECT COUNT(*) FROM admins";
    const checkResult = await pool.query(checkQuery);
    const adminCount = parseInt(checkResult.rows[0].count, 10);

    if (adminCount > 0) {
      return res.status(403).json({
        success: false,
        message: "Admin already exists. Contact superadmin for new accounts.",
      });
    }

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create admin
    const query = `
      INSERT INTO admins (username, email, password_hash, role, is_active)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [
        username,
        email,
        password_hash,
        "superadmin",
        true,
      ]);

      const admin = result.rows[0];

      res.status(201).json({
        success: true,
        data: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
          token: generateToken(admin.id),
        },
      });
    } catch (dbError) {
      if (dbError.message.includes("unique constraint") || dbError.code === "23505") {
        return res.status(400).json({
          success: false,
          message: "Email or username already exists",
        });
      }
      throw dbError;
    }
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find admin by email
    const query = "SELECT * FROM admins WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const admin = result.rows[0];

    // Check if admin is active
    if (!admin.is_active) {
      return res.status(401).json({
        success: false,
        message: "Admin account is inactive",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    res.json({
      success: true,
      data: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin.id),
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Admin
export const getAdminProfile = async (req, res) => {
  try {
    const query = `
      SELECT id, username, email, role, is_active, created_at
      FROM admins WHERE id = $1
    `;
    const result = await pool.query(query, [req.admin.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
