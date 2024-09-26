import Event from "../models/Event.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
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
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event
export const createEvent = async (req, res) => {
  const event = new Event({
    name: req.body.name,
    date: req.body.date,
    location: req.body.location,
    description: req.body.description,
    ticketsAvailable: req.body.ticketsAvailable,
    price: req.body.price,
    images: req.files.map((file) => file.id), // Store the file ids from GridFS
  });

  try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent); // Respond with the newly created event
  } catch (err) {
    res.status(400).json({ message: err.message }); // Respond with validation errors
  }
};

// Delete an event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    await event.remove();
    res.json({ message: "Event deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
