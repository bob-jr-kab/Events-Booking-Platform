import { useParams } from "react-router-dom";
import { Typography, Button, TextField, Box } from "@mui/material";
import axios from "axios"; // Import axios for API calls

const BookingPage = () => {
  const { id } = useParams();

  const handleBooking = async () => {
    // Handle booking logic here (save booking data to the database)
    const bookingDetails = {
      eventId: id,
      fullName: document.getElementById("fullName").value,
      email: document.getElementById("email").value,
      numberOfTickets: document.getElementById("numberOfTickets").value,
    };

    try {
      // Send booking details to the server
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        bookingDetails
      );
      alert("Booking confirmed! " + response.data.message);
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "400px", // Set a max width
        margin: "0 auto", // Center the Box
        padding: 2,
        boxShadow: 1,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ color: "#507687" }}>
        Booking Event
      </Typography>
      <TextField
        id="fullName"
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="numberOfTickets"
        label="Number of Tickets or places"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        sx={{ bgcolor: "#276C78" }}
        onClick={handleBooking}
      >
        Confirm Booking
      </Button>
    </Box>
  );
};

export default BookingPage;
