import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Link } from "react-router-dom"; // Import Link for navigation
import axios from "axios";
import EventIcon from "@mui/icons-material/Event"; // Date icon
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Location icon
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Price icon

const BookedEvents = () => {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState({}); // Store events by ID
  const [openDialog, setOpenDialog] = useState(false); // For dialog confirmation
  const [bookingToCancel, setBookingToCancel] = useState(null); // Track which booking to cancel

  useEffect(() => {
    const fetchBookingsAndEvents = async () => {
      try {
        const bookingsResponse = await axios.get(
          "http://localhost:5000/api/bookings"
        );
        setBookings(bookingsResponse.data);

        // Fetch event details for each booking
        const eventIds = bookingsResponse.data.map(
          (booking) => booking.eventId
        );
        const uniqueEventIds = [...new Set(eventIds)]; // Get unique event IDs
        const eventsResponse = await axios.get(
          `http://localhost:5000/api/events?ids=${uniqueEventIds.join(",")}`
        );
        const eventsData = eventsResponse.data.reduce((acc, event) => {
          acc[event._id] = event; // Map events by their ID
          return acc;
        }, {});
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching bookings or events:", error);
      }
    };

    fetchBookingsAndEvents();
  }, []);

  // Function to open confirmation dialog
  const handleCancelClick = (booking) => {
    setBookingToCancel(booking); // Set the booking to be canceled
    setOpenDialog(true); // Open the dialog
  };

  // Function to cancel the booking
  const handleConfirmCancel = async () => {
    if (!bookingToCancel) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${bookingToCancel._id}` // Ensure correct booking ID is used
      );
      // After successful deletion, remove the booking from state
      setBookings(bookings.filter((b) => b._id !== bookingToCancel._id));
      setOpenDialog(false); // Close the dialog
      setBookingToCancel(null); // Reset the booking to cancel
    } catch (error) {
      console.error("Error deleting booking:", error); // Log error for debugging
    }
  };

  // Function to close dialog without deleting
  const handleDialogClose = () => {
    setOpenDialog(false);
    setBookingToCancel(null);
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Booked Events
      </Typography>
      {bookings.map((booking) => {
        const event = events[booking.eventId]; // Get the event corresponding to the booking
        return (
          <Box
            key={booking._id}
            sx={{
              width: "100%",
              maxWidth: "600px", // Adjust the max width of the cards
              marginBottom: 2,
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: "4px", // Add border radius for rounded corners
              boxShadow: 2, // Optional: add shadow for depth
            }}
          >
            <Typography variant="h6">{booking.fullName}</Typography>
            <Typography variant="body2">Event ID: {booking.eventId}</Typography>
            <Typography variant="body2">Email: {booking.email}</Typography>
            <Typography variant="body2">
              Tickets: {booking.numberOfTickets}
            </Typography>
            {event ? (
              <>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <AttachMoneyIcon sx={{ mr: 1 }} />
                  Total Price: $
                  {(booking.numberOfTickets * event.price).toFixed(2)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <EventIcon sx={{ mr: 1 }} />
                  Event Name: {event.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <LocationOnIcon sx={{ mr: 1 }} />
                  Location: {event.location}
                </Typography>
                <Button
                  component={Link}
                  to={`/event/${event._id}`} // Link to the event details page
                  variant="text"
                  sx={{ mt: 1 }}
                >
                  View More
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ mt: 1, ml: 2 }}
                  onClick={() => handleCancelClick(booking)} // Open dialog on click
                >
                  Cancel Booking
                </Button>
              </>
            ) : (
              <Typography variant="body2">Loading event details...</Typography>
            )}
          </Box>
        );
      })}

      {/* Confirmation Dialog for Canceling Booking */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Cancel Booking</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to cancel the booking for{" "}
            {bookingToCancel?.fullName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            No, Keep Booking
          </Button>
          <Button onClick={handleConfirmCancel} color="error">
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BookedEvents;
