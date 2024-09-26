import { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import axios from "axios";

const AdminDashboard = () => {
  const [eventDetails, setEventDetails] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    imageLink: "",
    images: [],
    ticketsAvailable: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setEventDetails({ ...eventDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setEventDetails({ ...eventDetails, images: [...e.target.files] });
  };

  const handleAddEvent = async () => {
    // Basic validation
    if (
      !eventDetails.name ||
      !eventDetails.date ||
      !eventDetails.location ||
      !eventDetails.ticketsAvailable ||
      !eventDetails.price ||
      eventDetails.images.length === 0 // Ensure images are selected
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", eventDetails.name);
    formData.append("date", eventDetails.date);
    formData.append("location", eventDetails.location);
    formData.append("description", eventDetails.description);
    formData.append("ticketsAvailable", eventDetails.ticketsAvailable);
    formData.append("price", eventDetails.price);

    // Append each image file to FormData
    for (let i = 0; i < eventDetails.images.length; i++) {
      formData.append("images", eventDetails.images[i]);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Event created successfully:", response.data);
      alert("Event added successfully!");
    } catch (error) {
      console.error(
        "Error adding event:",
        error.response?.data || error.message
      );
      alert("Failed to add event");
    }
  };
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Admin Dashboard - Create Event
      </Typography>
      <Box
        component="form"
        sx={{
          width: "100%", // Full width in small screens, adjust as needed
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        noValidate
        autoComplete="off"
      >
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
          name="imageLink"
          label="Image URL (Optional)"
          value={eventDetails.imageLink}
          onChange={handleChange}
          fullWidth
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
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="image-upload"
          type="file"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" component="span">
            Upload Images
          </Button>
          {eventDetails.images.length > 0 && (
            <Typography variant="body2" gutterBottom>
              {eventDetails.images.length} image(s) selected
            </Typography>
          )}
        </label>
        <Button variant="contained" color="primary" onClick={handleAddEvent}>
          Add Event
        </Button>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
