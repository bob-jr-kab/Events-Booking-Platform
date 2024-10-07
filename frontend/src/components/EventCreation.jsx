import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload"; // Import CloudUpload icon
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
  const [selectedImages, setSelectedImages] = useState([]);
  const [isFree, setIsFree] = useState(false); // State for free toggle

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleToggleChange = (e) => {
    const checked = e.target.checked;
    setIsFree(checked);
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      price: checked ? "Free" : 0, // Set price as "Free" when toggle is checked
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files); // Store selected images in the state
  };

  const clearImageSelection = () => {
    setSelectedImages([]); // Clear selected images
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append event details
    Object.entries(eventDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append selected images
    selectedImages.forEach((image) => {
      formData.append("images", image); // Append each selected image to the formData
    });

    try {
      const response = await axios.post(
        "${window.location.origin}/api/events",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      console.log("Event created successfully:", response.data);

      // Reset form after successful event creation
      setEventDetails({
        name: "",
        date: "",
        location: "",
        description: "",
        ticketsAvailable: 0,
        price: 0,
      });
      setSelectedImages([]); // Clear images
      setSnackbarMessage("Event created successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error(
        "Error creating event:",
        error.response?.data || error.message
      );
      setSnackbarMessage("Failed to create event");
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
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#507687", textAlign: "center" }}
      >
        Create New Event
      </Typography>
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

      {/* Price and Free Event Toggle Side by Side */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          name="price"
          label="Price"
          type="text" // Changed to text to allow for "Free"
          value={isFree ? "Free" : eventDetails.price} // Show "Free" when toggled
          onChange={handleChange}
          disabled={isFree} // Disable price field when free is toggled
          sx={{ flex: 1, maxWidth: "500px" }} // Reduce width of price input
        />
        <FormControlLabel
          control={
            <Switch
              checked={isFree}
              onChange={handleToggleChange}
              name="free"
              color="primary"
            />
          }
          label="Free Event"
        />
      </Box>

      {/* Image upload */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          sx={{ bgcolor: "#276C78", width: "200px" }} // Adjusted width of button
          startIcon={<CloudUploadIcon />} // Added upload icon
        >
          Upload Images
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
        {/* Display selected image count with cancel (X) button */}
        {selectedImages.length > 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography>{selectedImages.length} images selected</Typography>
            <IconButton size="small" onClick={clearImageSelection}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        )}
      </Box>

      <Button variant="contained" sx={{ bgcolor: "#276C78" }} type="submit">
        Post Event
      </Button>

      {/* Snackbar for error handling */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
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
