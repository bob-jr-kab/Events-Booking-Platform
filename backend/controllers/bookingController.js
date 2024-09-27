import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res) => {
  const booking = new Booking({
    eventId: req.body.eventId,
    fullName: req.body.fullName,
    email: req.body.email,
    numberOfTickets: req.body.numberOfTickets,
  });

  try {
    const savedBooking = await booking.save();
    res
      .status(201)
      .json({ message: "Booking confirmed!", booking: savedBooking });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to delete a booking
export const deleteBooking = async (req, res) => {
  try {
    // Find the booking by ID and delete it
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    // Log the error and respond with a 500 status
    console.error("Error deleting booking:", err);
    res.status(500).json({ message: "Failed to delete booking" });
  }
};
