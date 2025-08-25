import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import pasteRoutes from "./routes/pastes.js";

// Load environment variables
dotenv.config({ path: "./config.env" });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB with better error handling
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Server will continue without database connection");
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/pastes", pasteRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "NoteSaver API is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
