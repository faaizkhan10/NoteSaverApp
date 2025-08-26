import express from "express";
import { body, validationResult } from "express-validator";
import Paste from "../models/Paste.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// @route   POST /api/pastes
// @desc    Create a new paste
// @access  Private
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content, isPublic = false } = req.body;

      const paste = await Paste.create({
        title,
        content,
        user: req.user.id,
        isPublic,
      });

      res.status(201).json({
        success: true,
        paste,
      });
    } catch (error) {
      console.error("Create paste error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   GET /api/pastes
// @desc    Get all pastes for current user
// @access  Private
router.get("/", async (req, res) => {
  try {
    const pastes = await Paste.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: pastes.length,
      pastes,
    });
  } catch (error) {
    console.error("Get pastes error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pastes/:id
// @desc    Get a specific paste
// @access  Private
router.get("/:id", async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    // Check if user owns the paste or if it's public
    if (paste.user.toString() !== req.user.id && !paste.isPublic) {
      return res
        .status(401)
        .json({ message: "Not authorized to access this paste" });
    }

    res.json({
      success: true,
      paste,
    });
  } catch (error) {
    console.error("Get paste error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   PUT /api/pastes/:id
// @desc    Update a paste
// @access  Private
router.put(
  "/:id",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").notEmpty().withMessage("Content is required"),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content, isPublic } = req.body;

      let paste = await Paste.findById(req.params.id);

      if (!paste) {
        return res.status(404).json({ message: "Paste not found" });
      }

      // Check if user owns the paste
      if (paste.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ message: "Not authorized to update this paste" });
      }

      paste = await Paste.findByIdAndUpdate(
        req.params.id,
        { title, content, isPublic },
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        paste,
      });
    } catch (error) {
      console.error("Update paste error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// @route   DELETE /api/pastes/:id
// @desc    Delete a paste
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const paste = await Paste.findById(req.params.id);

    if (!paste) {
      return res.status(404).json({ message: "Paste not found" });
    }

    // Check if user owns the paste
    if (paste.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to delete this paste" });
    }

    await paste.deleteOne();

    res.json({
      success: true,
      message: "Paste deleted successfully",
    });
  } catch (error) {
    console.error("Delete paste error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/pastes/public/all
// @desc    Get all public pastes
// @access  Public (no auth required)
router.get("/public/all", async (req, res) => {
  try {
    const pastes = await Paste.find({ isPublic: true })
      .populate("user", "username")
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: pastes.length,
      pastes,
    });
  } catch (error) {
    console.error("Get public pastes error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

