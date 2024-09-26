import express from "express";
import {
  getAllEvents,
  getEventById,
  createEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { GridFsStorage } from "multer-gridfs-storage"; // Ensure you import GridFsStorage
import multer from "multer";
import mongoose from "mongoose"; // Import mongoose
import dotenv from "dotenv";

dotenv.config();

// MongoDB URI
const mongoURI = process.env.MONGO_URI; // Make sure this is set in your .env file

// Create a connection to MongoDB
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create storage engine using GridFS
const storage = new GridFsStorage({
  db: conn, // Pass the database connection
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: "uploads", // Bucket name to store files
    };
  },
});

const upload = multer({ storage });

const router = express.Router();

// Define routes and link them to controller functions
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.post("/", upload.array("images", 5), createEvent); // Adjust to allow multiple images
router.delete("/:id", deleteEvent);

export default router;
