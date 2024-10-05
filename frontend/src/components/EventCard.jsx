import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EventIcon from "@mui/icons-material/Event"; // Icon for date
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Icon for location
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icon for price
import MoneyOffIcon from "@mui/icons-material/MoneyOff"; // Icon for free events

const EventCard = ({ event }) => {
  // Format the date to get the day and date number
  const eventDate = new Date(event.date);
  const day = eventDate.toLocaleString("en-US", { weekday: "long" });
  const dateNumber = eventDate.getDate();
  const fullDate = eventDate.toLocaleDateString();

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
            width: { xs: "100%", md: "150px" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#AFD3E2",
            textAlign: "center",
            padding: "5px",
            margin: "5px",
            borderRadius: "4px",
            flexDirection: "column",
          }}
        >
          {event.images && event.images.length > 0 ? (
            <img
              src={`${event.images[0]}`} // Construct the full image URL using the base URL
              alt={event.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "4px 0 0 4px",
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

          {/* Date with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <EventIcon sx={{ marginRight: "5px" }} />
            <Typography variant="body2">{fullDate}</Typography>
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

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              View Details
            </Typography>
            <IconButton
              component={Link}
              to={`/event/${event._id}`}
              sx={{ color: "#276C78", padding: 0 }}
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
