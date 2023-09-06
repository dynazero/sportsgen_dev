import mongoose from "mongoose";

const tournamentEventSchema = new mongoose.Schema({
    tournamentId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    categoryName: {
        type: String,
        required: true,
        trim: true,
    },
    categoryKey: {
        type: Number,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Live', 'Closed'],
        default: 'Live'
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
    },
    endTime: {
        type: String,
        required: false,
        trim: true,
    }
    // eventType: {
    //     type: String,
    //     required: true
    // },
});

const TournamentEvent = mongoose.models.TournamentEvent || mongoose.model("TournamentEvent", tournamentEventSchema, "tournamentevent");

export default TournamentEvent;