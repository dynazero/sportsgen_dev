import mongoose from "mongoose";

const tournamentSchema = new mongoose.Schema({

    eventId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventLogo: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        required: true
    },
    categories: {
        type: [Number],
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    format: {
        type: String,
        enum: ['Single Elimination', 'Double Elimination'],
        default: 'Single Elimination'
    },
    matchForThird: {
        type: Boolean,
        default: false
    },
    registrationFee: {
        type: Number,
        required: true
    },
    maxParticipants: {
        type: Number,
        default: 32
    },
    startTime: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Check-in', 'Live', 'Finals', 'Awarding', 'Closed'],
        default: 'Check-in'
    },
    // eventType: {
    //     type: String,
    //     required: true
    // },
});

const Tournament = mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema, "tournament");

export default Tournament;