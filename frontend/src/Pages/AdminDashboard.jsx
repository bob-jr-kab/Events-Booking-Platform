import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import EventCard from "../components/EventCard"; // EventCard Component
import EventForm from "../components/EventForm"; // EventForm Component

const BASE_URL = "http://localhost:5000"; // Ensure this matches your backend URL

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog open state

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);

        // Build image URLs for events
        const eventsWithImages = response.data.map((event) => ({
          ...event,
          images: event.images.map((image) => `${BASE_URL}${image}`),
        }));

        setEvents(eventsWithImages);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/events/${id}`);
      if (response.status === 200) {
        setEvents(events.filter((event) => event._id !== id));
        alert("Event deleted successfully");
      } else {
        alert("Failed to delete event");
      }
    } catch (error) {
      console.error(
        "Failed to delete event",
        error.response?.data || error.message
      );
      alert("Failed to delete event");
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event); // Set the event to be edited
    setDialogOpen(true); // Open the dialog
  };

  const handleEventUpdate = async (updatedEvent, selectedImages) => {
    try {
      const formData = new FormData();

      // Append updated event details to FormData
      Object.entries(updatedEvent).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append selected images to FormData
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.put(
        `${BASE_URL}/api/events/${editingEvent._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Update the events list with the modified event
      setEvents(
        events.map((event) =>
          event._id === editingEvent._id ? response.data : event
        )
      );
      setDialogOpen(false); // Close the dialog after editing
      alert("Event updated successfully!");
    } catch (error) {
      console.error(
        "Failed to update event",
        error.response?.data || error.message
      );
      alert("Failed to update event");
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        gutterBottom
        sx={{ color: "#001F3F", textAlign: "center" }}
      >
        Event Listings
      </Typography>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Event</DialogTitle>
        <DialogContent>
          {editingEvent && (
            <EventForm
              initialEventDetails={editingEvent} // Populate form with current event data
              onSubmit={handleEventUpdate} // Pass the update handler to the form
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {events.length === 0 ? (
        <Typography>No events available</Typography>
      ) : (
        events.map((event) => (
          <Box
            key={event._id}
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {/* Pass the event data to EventCard, which includes images */}
            <EventCard event={event} />
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                display: "flex",
                gap: 1,
              }}
            >
              <IconButton color="primary" onClick={() => handleEdit(event)}>
                <Edit />
              </IconButton>
              <IconButton
                color="#B8001F"
                onClick={() => handleDelete(event._id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </Box>
        ))
      )}
    </Container>
  );
};

export default AdminDashboard;
