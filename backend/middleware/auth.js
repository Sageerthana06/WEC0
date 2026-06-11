import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

/**
 * Protect routes — verifies JWT token from Authorization header
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch admin from PostgreSQL
      const query = `
        SELECT id, username, email, role, is_active
        FROM admins WHERE id = $1
      `;
      const result = await pool.query(query, [decoded.id]);

      if (result.rows.length === 0) {
        return res.status(401).json({
          success: false,
          message: "Admin not found",
        });
      }

      const admin = result.rows[0];

      if (!admin.is_active) {
        return res.status(401).json({
          success: false,
          message: "Admin account is inactive",
        });
      }

      req.admin = admin;
      next();
    } catch (error) {
      console.error("Auth error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });
  }
};

/**
 * Generate JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export { protect, generateToken };
