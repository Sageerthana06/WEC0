import { pool } from "../config/db.js";

// @desc    Get all gallery items
// @route   GET /api/gallery
// @access  Public
export const getGallery = async (req, res) => {
  try {
    const { category } = req.query;

    let query = "SELECT * FROM gallery";
    const params = [];

    if (category && category !== "all") {
      query += " WHERE category = $1";
      params.push(category);
    }

    query += " ORDER BY created_at DESC";

    const result = await pool.query(query, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
export const getGalleryById = async (req, res) => {
  try {
    const query = "SELECT * FROM gallery WHERE id = $1";
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching gallery item:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create a gallery item
// @route   POST /api/gallery
// @access  Admin
export const createGalleryItem = async (req, res) => {
  try {
    const { title, description, image_url, category, display_order } = req.body;

    if (!title || !image_url) {
      return res.status(400).json({
        success: false,
        message: "Title and image_url are required",
      });
    }

    const query = `
      INSERT INTO gallery (title, description, image_url, category, display_order)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const result = await pool.query(query, [
      title,
      description || null,
      image_url,
      category || null,
      display_order || null,
    ]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating gallery item:", error);
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: error.message,
    });
  }
};

// @desc    Update a gallery item
// @route   PUT /api/gallery/:id
// @access  Admin
export const updateGalleryItem = async (req, res) => {
  try {
    const { title, description, image_url, category, display_order } = req.body;

    const query = `
      UPDATE gallery
      SET title = $1, description = $2, image_url = $3, category = $4,
          display_order = $5, updated_at = NOW()
      WHERE id = $6
      RETURNING *
    `;

    const result = await pool.query(query, [
      title,
      description || null,
      image_url,
      category || null,
      display_order || null,
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating gallery item:", error);
    res.status(400).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

// @desc    Delete a gallery item
// @route   DELETE /api/gallery/:id
// @access  Admin
export const deleteGalleryItem = async (req, res) => {
  try {
    const query = "DELETE FROM gallery WHERE id = $1";
    await pool.query(query, [req.params.id]);

    res.json({
      success: true,
      message: "Gallery item removed",
    });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};
