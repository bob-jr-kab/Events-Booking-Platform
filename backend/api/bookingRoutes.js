// backend/api/bookings.js
import express from "express";
import {
  createBooking,
  getAllBookings,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();
router.post("/", createBooking);
router.get("/", getAllBookings);
router.delete("/:id", deleteBooking);
export default router;
