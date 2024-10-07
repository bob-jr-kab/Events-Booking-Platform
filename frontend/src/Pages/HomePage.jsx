import { useState, useEffect, useRef } from "react";
import {
  Container,
  Box,
  Button,
  Collapse,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EventCard from "../components/EventCard"; // Import the EventCard component
import axios from "axios"; // Import axios
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const HomePage = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false); // For collapsing filter
  const [calendarOpen, setCalendarOpen] = useState(false); // For calendar visibility
  const [searchText, setSearchText] = useState(""); // For filtering by name
  const [sortCriteria, setSortCriteria] = useState(""); // For sorting
  const [selectedDate, setSelectedDate] = useState(null); // For selected date
  const calendarRef = useRef(null); // To track clicks outside calendar

  const BASE_URL = "${window.location.origin}"; // Ensure this matches your backend URL

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/events`);

        // Build image URLs for events and sort by latest date
        const eventsWithImages = response.data
          .map((event) => ({
            ...event,
            images: event.images.map((image) => `${BASE_URL}${image}`),
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest date

        setEvents(eventsWithImages);
        setFilteredEvents(eventsWithImages); // Initially display all events sorted
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Click outside to close calendar
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [calendarRef]);

  // Handle date selection from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
    filterByDate(date); // Call the filter function after date selection
  };

  // Function to handle filtering based on search input
  const handleSearchChange = (e) => {
    const search = e.target.value.toLowerCase();
    setSearchText(search);

    const filtered = events.filter((event) =>
      event.name.toLowerCase().includes(search)
    );
    setFilteredEvents(filtered);
  };

  // Function to handle sorting based on user selection
  const handleSortChange = (e) => {
    const criteria = e.target.value;
    setSortCriteria(criteria);

    let sortedEvents = [...filteredEvents]; // Create a copy of the filtered events
    if (criteria === "date") {
      sortedEvents.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by latest to oldest
    } else if (criteria === "price") {
      sortedEvents.sort((a, b) => a.price - b.price);
    }

    setFilteredEvents(sortedEvents);
  };

  // Function to filter events by the selected date
  const filterByDate = (date) => {
    const filtered = events.filter((event) =>
      dayjs(event.date).isSame(dayjs(date), "day")
    );
    setFilteredEvents(filtered);
  };

  // Clear filters and reset all states
  const clearFilters = () => {
    setSearchText("");
    setSortCriteria("");
    setSelectedDate(null);
    setFilteredEvents(events); // Reset to show all events
  };

  // Toggle Calendar Function
  const toggleCalendar = () => {
    setCalendarOpen((prevOpen) => {
      const newOpen = !prevOpen;
      if (newOpen) setFilterOpen(false); // Close filter if calendar is open
      return newOpen;
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          maxWidth: "1366px",
          margin: "0 auto",
          padding: "10px",
        }}
      >
        {/* Filter and Sort Section */}
        <Box
          sx={{
            marginBottom: 4,
            width: "100%",
            display: "flex",
            alignItems: "center", // Align vertically center
            gap: 2, // Gap between elements
            flexDirection: "row",
          }}
        >
          {/* Filter Button */}
          <Button
            sx={{ color: "#507687" }}
            onClick={() => {
              setFilterOpen(!filterOpen);
              setCalendarOpen(false); // Ensure calendar is closed when filter opens
            }}
            endIcon={<ExpandMoreIcon />}
          >
            Filter
          </Button>

          {/* Calendar Icon */}
          <Button
            onClick={toggleCalendar}
            endIcon={<CalendarMonthIcon sx={{ color: "#507687" }} />}
          />

          {/* Clear Filters Button */}
          <Button onClick={clearFilters} sx={{ color: "#507687" }}>
            Clear Filters
          </Button>
        </Box>

        {/* Calendar Popup */}
        <Collapse in={calendarOpen}>
          <Box
            ref={calendarRef}
            sx={{
              position: "absolute",
              left: "0", // Appear to the left of the HomePage
              top: "120px",
              zIndex: 10,
              padding: "16px",
              backdropFilter: "blur(10px)", // Glass-like effect
              borderRadius: "8px",
            }}
          >
            <DateCalendar
              value={selectedDate}
              onChange={handleDateChange}
              sx={{ width: "200px", height: "250px" }}
            />
          </Box>
        </Collapse>

        {/* Filter Inputs */}
        <Collapse in={filterOpen}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginBottom: 2,
              "@media (min-width: 600px)": {
                flexDirection: "row", // Horizontally align inputs on larger screens
              },
            }}
          >
            {/* Search Filter */}
            <TextField
              label="Search by Event Name"
              variant="outlined"
              value={searchText}
              onChange={handleSearchChange}
              sx={{
                width: "100%", // Full width on small screens
                "@media (min-width: 600px)": {
                  width: "20%", // Adjust to 50% on larger screens
                },
              }}
            />

            {/* Sort Dropdown */}
            <FormControl
              variant="outlined"
              sx={{
                width: "100%", // Full width on small screens
                "@media (min-width: 600px)": {
                  width: "15%", // Adjust to 30% on larger screens
                },
              }}
            >
              <InputLabel>Sort by</InputLabel>
              <Select value={sortCriteria} onChange={handleSortChange}>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="price">Price</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Collapse>

        {/* Event Cards Section */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))
          ) : (
            <Box>No events found!</Box>
          )}
        </Box>
      </Container>
    </LocalizationProvider>
  );
};

export default HomePage;
