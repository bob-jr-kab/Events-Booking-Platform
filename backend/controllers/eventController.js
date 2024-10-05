import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import Event from "../models/Event.js";

// Fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    // Populate image URLs based on disk storage
    const eventsWithImages = events.map((event) => {
      if (event.images && event.images.length > 0) {
        const images = event.images.map((filename) => `/uploads/${filename}`); // Create URL for each image
        return { ...event._doc, images }; // Attach image URLs to the event object
      } else {
        return { ...event._doc, images: [] }; // Ensure images field is present even if empty
      }
    });

    res.json(eventsWithImages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Populate image URLs based on disk storage
    if (event.images && event.images.length > 0) {
      const images = event.images.map((filename) => `/uploads/${filename}`); // Construct URL for each image
      event._doc.images = images; // Attach image URLs to the event object
    } else {
      event._doc.images = []; // Ensure images field is present even if empty
    }

    res.json(event);
  } catch (err) {
    console.error("Error fetching event by ID:", err);
    res.status(500).json({ message: err.message });
  }
};

// Create event controller
export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description, ticketsAvailable, price } =
      req.body;

    // Ensure req.files is defined and contains images
    const images =
      req.files && req.files.length > 0
        ? req.files.map((file) => file.filename) // Store filenames directly
        : [];

    const newEvent = new Event({
      name,
      date,
      location,
      description,
      ticketsAvailable,
      price,
      images, // Store image filenames (local disk)
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
};

// Update an existing event (PUT)
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = {
      name: req.body.name,
      date: req.body.date,
      location: req.body.location,
      description: req.body.description,
      ticketsAvailable: req.body.ticketsAvailable,
      price: req.body.price,
    };

    // Handle new images if any
    if (req.files && req.files.length > 0) {
      updatedData.images = req.files.map((file) => file.filename);
    }

    const event = await Event.findByIdAndUpdate(id, updatedData, { new: true });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event); // Respond with the updated event
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Delete associated images from the disk if they exist
    if (event.images && event.images.length > 0) {
      event.images.forEach((filename) => {
        const filePath = path.join(__dirname, "../uploads", filename);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete image ${filename}:`, err);
          }
        });
      });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
