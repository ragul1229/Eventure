import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import authRoutes from "./routes/authRoutes.js";
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
// Test Routes
app.get("/", (req, res) => {
  res.send("Eventure Backend is Running 🚀");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: `Hello ${req.user.name}, your role is ${req.user.role}` });
});

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
