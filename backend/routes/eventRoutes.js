import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent, // Import the updateEvent controller
  deleteEvent,
} from "../controllers/eventController.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
