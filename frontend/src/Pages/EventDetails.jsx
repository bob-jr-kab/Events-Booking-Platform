// src/pages/EventDetails.jsx
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${id}`
        );
        setEvent(response.data);
      } catch (err) {
        setError("Error fetching event details.");
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!event) {
    return <Typography>No event found.</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4">{event.name}</Typography>
          <Typography variant="body2">
            Date: {new Date(event.date).toLocaleDateString()}
          </Typography>
          <Typography variant="body2">Location: {event.location}</Typography>
          <Typography variant="body2">
            Description: {event.description || "No description available."}
          </Typography>
          <Typography variant="body2">
            Tickets Available: {event.ticketsAvailable}
          </Typography>
          <Typography variant="body2">
            Price: ${event.price.toFixed(2)}
            {/* Display price with two decimal places */}
          </Typography>
          <Button
            component={Link}
            to={`/booking/${event._id}`}
            variant="contained"
            sx={{ mt: 2, bgcolor: "#276C78" }}
          >
            Book Now
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EventDetails;
