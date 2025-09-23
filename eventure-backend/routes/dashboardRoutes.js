import express from "express";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/admin", protect, (req, res) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({
    stats: {
      totalUsers: 10,
      totalEvents: 5,
    },
  });
});

router.get("/organizer", protect, (req, res) => {
  if (req.user.role !== "Organizer") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({
    stats: {
      createdEvents: 3,
      upcomingEvents: 2,
    },
  });
});
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
      upcomingEvents: 4,
      registeredEvents: 2,
    },
  });
});




export default router;
