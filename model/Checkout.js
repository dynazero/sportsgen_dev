import mongoose from "mongoose";

const registrationList = new mongoose.Schema({
  registrationKey: {
    type: Number,
    required: true,
    trim: true,
  },
  tournamentId: {
    type: mongoose.Types.ObjectId,
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
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  entryFee: {
    type: Number,
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
  athleteImageURL: {
    type: String,
    required: true,
    trim: true,
  },
})

const checkoutSchema = new mongoose.Schema({
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
  registration: {
    type: [registrationList],
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  paymentProof: {
    type: String,
    required: true,
  },
  status: {
    type: String,
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

const Checkout = mongoose.models.Checkout || mongoose.model("Checkout", checkoutSchema, "checkout");

export default Checkout;

