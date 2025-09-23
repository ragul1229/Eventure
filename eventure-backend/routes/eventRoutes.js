import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { upload } from "../middleware/upload.js"; // ✅ use your centralized multer

const router = express.Router();

// Only organizer can create events, handle image upload
router.post("/", protect, upload.single("image"), createEvent);

// Get all events (protected)
router.get("/", protect, getEvents);

// Get single event
router.get("/:id", getEventById);

// Update event (Organizer only) with optional image upload
router.put("/:id", protect, upload.single("image"), updateEvent);

// Delete event (Organizer only)
router.delete("/:id", protect, deleteEvent);

export default router;
