import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";

const EventCreation = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    ticketsAvailable: 0,
    price: 0,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        eventDetails
      );
      console.log("Event created successfully:", response.data);
      // Reset the form after successful submission
      setEventDetails({
        name: "",
        date: "",
        location: "",
        description: "",
        ticketsAvailable: 0,
        price: 0,
      });
      // Show success message
      setSnackbarMessage("Event created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      // Show error message using Snackbar
      setSnackbarMessage(
        "Failed to create event: " +
          (error.response?.data.message || "Unknown error")
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        maxWidth: "600px", // Adjust the max width as needed
        mx: "auto", // Center the form
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h5" gutterBottom>
        Create New Event
      </Typography>
      <TextField
        name="name"
        label="Event Name"
        value={eventDetails.name}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="date"
        label="Event Date"
        type="date"
        value={eventDetails.date}
        onChange={handleChange}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        name="location"
        label="Location"
        value={eventDetails.location}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="description"
        label="Event Description"
        value={eventDetails.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
      />
      <TextField
        name="ticketsAvailable"
        label="Tickets Available"
        type="number"
        value={eventDetails.ticketsAvailable}
        onChange={handleChange}
        fullWidth
      />
      <TextField
        name="price"
        label="Price"
        type="number"
        value={eventDetails.price}
        onChange={handleChange}
        fullWidth
      />
      <Button variant="contained" sx={{ bgcolor: "#276C78" }} type="submit">
        Create Event
      </Button>

      {/* Snackbar for error handling */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventCreation;
