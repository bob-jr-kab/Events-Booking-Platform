import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import EventIcon from "@mui/icons-material/Event"; // Icon for date
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Icon for location
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icon for price
import MoneyOffIcon from "@mui/icons-material/MoneyOff"; // Icon for free events

// Base URL for images stored on disk
const BASE_URL = "http://localhost:5000"; // Update with your actual path

const EventDetails = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/events/${id}`
        );

        // Populate image URLs
        if (response.data.images && response.data.images.length > 0) {
          const images = response.data.images.map(
            (filename) => `${BASE_URL}${filename}`
          );
          setEvent({ ...response.data, images }); // Attach image URLs to the event object
        } else {
          setEvent(response.data); // Set event data without images
        }
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

          {/* Date with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <EventIcon sx={{ marginRight: "5px" }} />
            <Typography variant="body2">
              {new Date(event.date).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Location with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <LocationOnIcon sx={{ marginRight: "5px" }} />
            <Typography variant="body2">{event.location}</Typography>
          </Box>

          {/* Price with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            {event.price === "Free" ? (
              <>
                <MoneyOffIcon sx={{ marginRight: "5px" }} />
                <Typography variant="body2">Free</Typography>
              </>
            ) : (
              <>
                <AttachMoneyIcon sx={{ marginRight: "5px" }} />
                <Typography variant="body2">{`${event.price} TL`}</Typography>
              </>
            )}
          </Box>

          {/* Description */}
          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Description: {event.description || "No description available."}
          </Typography>

          <Typography variant="body2" sx={{ marginTop: "10px" }}>
            Tickets Available: {event.ticketsAvailable}
          </Typography>

          {/* Display all event images */}
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px", mt: 2 }}>
            {event.images && event.images.length > 0 ? (
              event.images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Event Image ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ))
            ) : (
              <Typography>No images available for this event.</Typography>
            )}
          </Box>

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
