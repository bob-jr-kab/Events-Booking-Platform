import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js"; // Import updated controller methods
import dotenv from "dotenv";
import { upload } from "../config/Multer.js"; // Import the local disk multer config

dotenv.config();

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllEvents); // Get all events
router.get("/:id", getEventById); // Get a single event by ID

// Route for creating an event with image upload (max 5 images)
router.post("/", upload.array("images", 5), createEvent); // Use array for multiple images

// Route for updating an event with optional image upload
router.put("/:id", upload.array("images", 5), updateEvent); // Use array for multiple images

// Route for deleting an event
router.delete("/:id", deleteEvent); // Delete an event

export default router;
