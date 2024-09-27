import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const EventCard = ({ event }) => {
  // Format the date to get the day and date number
  const eventDate = new Date(event.date);
  const day = eventDate.toLocaleString("en-US", { weekday: "long" }); // Full day name, e.g., "Monday"
  const dateNumber = eventDate.getDate(); // Get the date number, e.g., "24"
  const fullDate = eventDate.toLocaleDateString(); // Get the full date string

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1366px",
        marginBottom: "20px",
      }}
    >
      <Card
        sx={{
          mx: "auto",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "150px" }, // Set a fixed width for the image box
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#AFD3E2", // Fallback color if no image
            textAlign: "center",
            padding: "5px",
            margin: "5px",
            borderRadius: "4px",
            flexDirection: "column", // Stack day and date
          }}
        >
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px 0 0 4px", // Round the corners if needed
              }}
            />
          ) : (
            <>
              <div style={{ fontSize: "1.5rem" }}>{day}</div>
              <div style={{ fontSize: "3rem", fontWeight: "bold" }}>
                {dateNumber}
              </div>
            </>
          )}
        </Box>

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h5">{event.name}</Typography>
          <Typography variant="body2">
            Date: {fullDate} {/* Display the full date here */}
          </Typography>
          <Typography variant="body2">Location: {event.location}</Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              View Details
            </Typography>
            <IconButton
              component={Link}
              to={`/event/${event._id}`}
              sx={{ color: "#276C78", padding: 0 }} // No background
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventCard;
