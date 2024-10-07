// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import EventDetails from "./pages/EventDetails.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import BookedEvents from "./pages/BookedEvents.jsx";
import EventCreation from "./components/EventCreation.jsx";
import EventDetails from "./pages/EventDetails.jsx";
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
