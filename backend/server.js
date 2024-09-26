import express from "express";
import { connectDB } from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import eventRoutes from "./routes/eventRoutes.js";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON bodies

// Routes (will be added later)
app.use("/api/events", eventRoutes);
// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});
