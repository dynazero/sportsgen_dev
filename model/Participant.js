import mongoose from "mongoose";

const participantSchema = new mongoose.Schema({
  tournamentId: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  team: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  athleteId: {
    type: mongoose.Types.ObjectId,
    required: true,
    trim: true,
  },
  athleteName: {
    type: String,
    required: true,
    trim: true,
  },
  imageURL: {
    type: String,
    required: true,
    trim: true,
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    trim: true,
  },
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  eventKey: {
    type: Number,
    required: true,
    trim: true,
  },
  categoryKey: {
    type: Number,
    required: true,
    trim: true,
  },
  entryFee: {
    type: Number,
    required: true,
    trim: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  // uniqueFileName: {
  //   type: String,
  //   required: true,
  // },
});

const Participant = mongoose.models.Participant || mongoose.model("Participant", participantSchema, "participant");

export default Participant;

