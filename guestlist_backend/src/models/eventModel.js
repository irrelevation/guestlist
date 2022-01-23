import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "An event must have a name"],
  },
  start_time: {
    type: Date,
  },
  end_time: {
    type: Date,
  },
  creator: {
    type: String,
    required: [true, "An event must have a creator"],
  },
  location: {
    type: String,
  },
  guests: {
    type: Array,
  },
});

export const Event = mongoose.model("Event", eventSchema);
