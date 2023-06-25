import mongoose from "mongoose";

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
    type: [mongoose.Types.ObjectId],
    required: true,
    trim: true,
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

