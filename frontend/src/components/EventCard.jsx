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

  const iconColor = "#507687"; // Set green color for icons
  const typoColor = "#025464";
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1366px",
        padding: "0px",
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
            width: { xs: "100%", md: "200px" },
            height: { xs: "300px", md: "200px" },

            display: "flex",
            flexDirection: "column", // Stack day and date vertically
            alignItems: "center", // Center items horizontally
            justifyContent: "center", // Center items vertically
            backgroundColor: "#DEE5D4",
            borderRadius: "4px",
            textAlign: "center", // Center text
          }}
        >
          {event.images && event.images.length > 0 ? (
            <img
              src={`${event.images[0]}`} // Construct the full image URL using the base URL
              alt={event.name}
              style={{
                width: "100%",
                height: "100%", // Fill the entire height of the box
                objectFit: "cover", // Ensure the image covers the entire box
                borderRadius: "4px 0 0 4px", // Set border radius directly on the image
              }}
            />
          ) : (
            <>
              <Typography variant="h6" sx={{ color: "#7AB2B2" }}>
                {day}
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: "#7AB2B2" }}
              >
                {dateNumber}
              </Typography>
            </>
          )}
        </Box>

        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize", color: "#507687" }}
          >
            {event.name}
          </Typography>

          {/* Date with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <EventIcon sx={{ marginRight: "5px", color: iconColor }} />
            <Typography sx={{ color: typoColor }}>{fullDate}</Typography>
          </Box>

          {/* Location with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            <LocationOnIcon sx={{ marginRight: "5px", color: iconColor }} />
            <Typography sx={{ color: typoColor }}>{event.location}</Typography>
          </Box>

          {/* Price with Icon */}
          <Box sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
            {event.price === "Free" ? (
              <>
                <MoneyOffIcon sx={{ marginRight: "5px", color: iconColor }} />
                <Typography sx={{ color: typoColor }} variant="body2">
                  Free
                </Typography>
              </>
            ) : (
              <>
                <AttachMoneyIcon
                  sx={{ marginRight: "5px", color: iconColor }}
                />
                <Typography
                  sx={{ color: typoColor }}
                  variant="body2"
                >{`${event.price} TL`}</Typography>
              </>
            )}
          </Box>

          <Box
            sx={{ display: "flex", alignItems: "center", marginTop: "10px" }}
          >
            <Typography
              variant="body1"
              sx={{ marginRight: 1, color: typoColor }}
            >
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
