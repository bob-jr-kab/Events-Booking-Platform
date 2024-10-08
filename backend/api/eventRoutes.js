import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import dotenv from "dotenv";
import { upload } from "../config/Multer.js";

dotenv.config();

const router = express.Router();

router.get("/", getAllEvents);
router.get("/:id", getEventById);

router.post("/", upload.array("images", 5), createEvent);
router.put("/:id", upload.array("images", 5), updateEvent);
router.delete("/:id", deleteEvent);

export default router;
