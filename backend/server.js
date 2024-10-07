import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import path from "path"; // Uncomment this line if you need path for serving frontend

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve(); // Uncomment and use __dirname if you need to serve frontend

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

// If you want to serve the frontend in production, uncomment this section
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/dist/index.html"));
  });
}

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
