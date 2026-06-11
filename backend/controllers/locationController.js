import { pool } from "../config/db.js";

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public
export const getLocations = async (req, res) => {
  try {
    const query = "SELECT * FROM locations WHERE is_active = true ORDER BY display_order ASC";
    const result = await pool.query(query);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get single location
// @route   GET /api/locations/:id
// @access  Public
export const getLocationById = async (req, res) => {
  try {
    const query = "SELECT * FROM locations WHERE id = $1";
    const result = await pool.query(query, [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching location:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Get locations by city
// @route   GET /api/locations/city/:city
// @access  Public
export const getLocationsByCity = async (req, res) => {
  try {
    const query = `
      SELECT * FROM locations
      WHERE is_active = true AND city ILIKE $1
      ORDER BY display_order ASC
    `;
    const result = await pool.query(query, [`%${req.params.city}%`]);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching locations by city:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// @desc    Create location
// @route   POST /api/locations
// @access  Admin
export const createLocation = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      postal_code,
      country,
      phone,
      email,
      latitude,
      longitude,
      opening_hours,
      closing_hours,
      description,
      image_url,
      display_order,
    } = req.body;

    if (!name || !address || !city || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name, address, city, and phone are required",
      });
    }

    const query = `
      INSERT INTO locations
      (name, address, city, state, postal_code, country, phone, email,
       latitude, longitude, opening_hours, closing_hours, description, image_url, is_active, display_order)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      address,
      city,
      state || null,
      postal_code || null,
      country || null,
      phone,
      email || null,
      latitude || null,
      longitude || null,
      opening_hours || null,
      closing_hours || null,
      description || null,
      image_url || null,
      true,
      display_order || 0,
    ]);

    res.status(201).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error creating location:", error);
    res.status(400).json({
      success: false,
      message: "Invalid data",
      error: error.message,
    });
  }
};

// @desc    Update location
// @route   PUT /api/locations/:id
// @access  Admin
export const updateLocation = async (req, res) => {
  try {
    const {
      name,
      address,
      city,
      state,
      postal_code,
      country,
      phone,
      email,
      latitude,
      longitude,
      opening_hours,
      closing_hours,
      description,
      image_url,
      is_active,
      display_order,
    } = req.body;

    const query = `
      UPDATE locations
      SET name = $1, address = $2, city = $3, state = $4, postal_code = $5,
          country = $6, phone = $7, email = $8, latitude = $9, longitude = $10,
          opening_hours = $11, closing_hours = $12, description = $13,
          image_url = $14, is_active = $15, display_order = $16, updated_at = NOW()
      WHERE id = $17
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      address,
      city,
      state || null,
      postal_code || null,
      country || null,
      phone,
      email || null,
      latitude || null,
      longitude || null,
      opening_hours || null,
      closing_hours || null,
      description || null,
      image_url || null,
      is_active !== undefined ? is_active : true,
      display_order || 0,
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(400).json({
      success: false,
      message: "Update failed",
      error: error.message,
    });
  }
};

// @desc    Delete location
// @route   DELETE /api/locations/:id
// @access  Admin
export const deleteLocation = async (req, res) => {
  try {
    const query = "DELETE FROM locations WHERE id = $1";
    await pool.query(query, [req.params.id]);

    res.json({
      success: true,
      message: "Location deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting location:", error);
    res.status(500).json({
      success: false,
      message: "Delete failed",
      error: error.message,
    });
  }
};
