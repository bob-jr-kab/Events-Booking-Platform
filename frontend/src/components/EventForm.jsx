import { useState, useEffect } from "react";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";

const EventForm = ({ initialEventDetails, onSubmit }) => {
  const [eventDetails, setEventDetails] = useState(initialEventDetails);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  // Update the form when initialEventDetails changes
  useEffect(() => {
    setEventDetails(initialEventDetails);
  }, [initialEventDetails]);

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventDetails); // Call the passed in onSubmit function
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "10px 0px",
        gap: 2,
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="name"
        label="Event Title"
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
        Update Event
      </Button>

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

export default EventForm;
