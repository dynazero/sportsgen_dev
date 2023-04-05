import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  flag:{
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  // uniqueFileName: {
  //   type: String,
  //   required: true,
  // },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema, "events");

export default Event; 

