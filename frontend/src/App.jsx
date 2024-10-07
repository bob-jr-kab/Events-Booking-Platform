// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventDetails from "./Pages/EventDetails.jsx";
import BookingPage from "./Pages/BookingPage.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import BookedEvents from "./Pages/BookedEvents.jsx";
import EventCreation from "./components/EventCreation.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route path="/bookings" element={<BookedEvents />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create_event" element={<EventCreation />} />
      </Routes>
    </Router>
  );
}

export default App;
