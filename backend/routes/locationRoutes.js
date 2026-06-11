import express from "express";
import {
  getLocations,
  getLocationById,
  getLocationsByCity,
  createLocation,
  updateLocation,
  deleteLocation,
} from "../controllers/locationController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getLocations);
router.get("/city/:city", getLocationsByCity);
router.get("/:id", getLocationById);

// Admin-protected routes
router.post("/", protect, createLocation);
router.put("/:id", protect, updateLocation);
router.delete("/:id", protect, deleteLocation);

export default router;
