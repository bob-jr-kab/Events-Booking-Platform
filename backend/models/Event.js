import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ticketsAvailable: {
    type: Number,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [mongoose.Schema.Types.ObjectId], // Store image IDs from GridFS
    default: [],
  },
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
