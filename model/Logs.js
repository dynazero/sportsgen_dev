import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    categoryKey: {
        type: Number,
        required: true,
        trim: true,
    },
    logAccount: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },  
    logTime: {
        type: Date,
        default: Date.now,
      },
});

const Log = mongoose.models.Log || mongoose.model("Log", logSchema, "log");

export default Log;