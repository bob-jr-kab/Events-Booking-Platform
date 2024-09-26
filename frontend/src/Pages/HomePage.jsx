import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import axios from "axios";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "1366px", // set max-width
        margin: "0 auto", // ensure the content is centered
      }}
    >
      {events.map((event) => (
        <Box
          key={event.id}
          sx={{
            width: "100%", // full width of the container
            maxWidth: "1366px", // ensure no card exceeds this width
            marginBottom: "20px", // add some spacing between cards
          }}
        >
          <Card
            sx={{
              mx: "auto",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5">{event.name}</Typography>
              <Typography variant="body2">
                Date: {new Date(event.date).toLocaleDateString()}
              </Typography>
              <Typography variant="body2">
                Location: {event.location}
              </Typography>
              <Button
                component={Link}
                to={`/event/${event._id}`}
                variant="contained"
              >
                View Details
              </Button>
            </CardContent>
            {event.image && ( // Conditional rendering for the images
              <Box
                sx={{
                  display: { xs: "none", md: "flex" }, // show on medium screens and up
                  p: 2, // padding around the images
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <img
                  src={event.image[0]} // Assuming event.image is an array or object
                  alt="Event"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "5px",
                    marginRight: "10px", // add margin between images
                  }}
                />
                {event.image[1] && ( // Check if the second image exists
                  <img
                    src={event.image[1]}
                    alt="Event"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "5px",
                    }}
                  />
                )}
              </Box>
            )}
          </Card>
        </Box>
      ))}
    </Container>
  );
};

export default HomePage;
