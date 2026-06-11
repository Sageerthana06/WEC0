import express from "express";
import {
  getMessages,
  createMessage,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/messageController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public — submit contact form
router.post("/", createMessage);

// Admin-protected routes
router.get("/", protect, getMessages);
router.get("/:id", protect, getMessageById);
router.put("/:id", protect, updateMessageStatus);
router.delete("/:id", protect, deleteMessage);

export default router;
