import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
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
      type: String, // Change to String to accommodate "Free" or numerical values
    },
    images: [{ type: String }], // Store filenames as strings instead of ObjectIds
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
