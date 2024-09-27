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

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null); // Track the event being edited
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog open state

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/events/${id}`
      );
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

  const handleEventUpdate = async (updatedEvent) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/events/${editingEvent._id}`,
        updatedEvent
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
      <Typography variant="h4" gutterBottom>
        Admin Dashboard - Event Listings
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
              initialEventDetails={editingEvent}
              onSubmit={handleEventUpdate}
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
              marginBottom: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
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
                color="secondary"
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
