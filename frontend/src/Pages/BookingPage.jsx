// src/pages/BookingPage.jsx
import { useParams } from "react-router-dom";
import { Typography, Button, TextField, Box } from "@mui/material";

const BookingPage = () => {
  const { id } = useParams();

  const handleBooking = () => {
    // Handle booking logic here (save booking data to the database)
    alert("Booking confirmed!");
  };

  return (
    <Box>
      <Typography variant="h4">Booking for Event ID: {id}</Typography>
      <TextField
        label="Full Name"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField label="Email" variant="outlined" fullWidth margin="normal" />
      <TextField
        label="Number of Tickets"
        type="number"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleBooking}>
        Confirm Booking
      </Button>
    </Box>
  );
};

export default BookingPage;
