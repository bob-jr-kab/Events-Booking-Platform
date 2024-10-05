import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Serve static files from the uploads directory
app.use(
  "/uploads",
  express.static("D:/Events Booking Platform/backend/uploads") // Ensure this path is correct and the folder exists
);

// Routes
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);

// Connect to the database before starting the server
connectDB()
  .then(() => {
    // Start server only after successful DB connection
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process if DB connection fails
  });
