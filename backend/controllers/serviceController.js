import { pool } from "../config/db.js";

// @desc    Get all services
// @route   GET /api/services
// @access  Public
export const getServices = async (req, res) => {
  try {
    const query = "SELECT * FROM services ORDER BY created_at DESC";
    const result = await pool.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
export const getServiceById = async (req, res) => {
  try {
    const query = "SELECT * FROM services WHERE id = $1";
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create a service
// @route   POST /api/services
// @access  Admin
export const createService = async (req, res) => {
  try {
    const { name, description, icon, category, price, image_url } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required",
      });
    }

    const query = `
      INSERT INTO services (name, description, icon, category, price, image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      icon || null,
      category || null,
      price || null,
      image_url || null,
    ]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: error.message,
    });
  }
};

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Admin
export const updateService = async (req, res) => {
  try {
    const { name, description, icon, category, price, image_url } = req.body;

    const query = `
      UPDATE services
      SET name = $1, description = $2, icon = $3, category = $4,
          price = $5, image_url = $6, updated_at = NOW()
      WHERE id = $7
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      description || null,
      icon || null,
      category || null,
      price || null,
      image_url || null,
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(400).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

// @desc    Delete a service
// @route   DELETE /api/services/:id
// @access  Admin
export const deleteService = async (req, res) => {
  try {
    const query = "DELETE FROM services WHERE id = $1";
    await pool.query(query, [req.params.id]);

    res.json({
      success: true,
      message: "Service removed",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};
