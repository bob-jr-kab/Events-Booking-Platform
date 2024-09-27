import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking, // Import the deleteBooking function
} from "../controllers/bookingController.js";

const router = express.Router();

// Route to create a booking
router.post("/", createBooking);

// Route to get all bookings
router.get("/", getAllBookings);

// Route to delete a booking by ID
router.delete("/:id", deleteBooking); // DELETE route for booking

export default router;
