import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// Admin Stats
router.get("/admin", protect, async (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const totalUsers = await User.countDocuments({ role: "User" });
    const totalOrganizers = await User.countDocuments({ role: "Organizer" });
    const totalEvents = 5; // Replace with actual events count later

    res.json({ stats: { totalUsers, totalOrganizers, totalEvents } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Organizer Stats
router.get("/organizer", protect, async (req, res) => {
  if (req.user.role !== "Organizer") {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // Fetch organizer's events dynamically (replace mock with real DB call later)
    const createdEvents = 3; // Example placeholder
    const upcomingEvents = 2; // Example placeholder

    res.json({ stats: { createdEvents, upcomingEvents } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User Stats
router.get("/user", protect, (req, res) => {
  if (req.user.role !== "User") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({
    profile: {
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
    stats: {
      upcomingEvents: 4, // Replace with real DB query
      registeredEvents: 2, // Replace with real DB query
    },
  });
});


export default router;
