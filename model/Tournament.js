import mongoose from "mongoose";

const tournamentEvent = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    categoryKey:{
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    entryFee: {
        type: Number,
        required: true,
        trim: true,
    },
    maxParticipants: {
        type: Number,
        default: 32
    },
    startTime: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Check-in', 'Live', 'Finals', 'Awarding', 'Closed'],
        default: 'Check-in'
    },
})

const tournamentSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Types.ObjectId,
        required: true,
        trim: true,
    },
    eventName: {
        type: String,
        required: true,
        trim: true,
    },
    eventLogo: {
        type: String,
        required: true,
        trim: true,
    },
    organizer: {
        type: String,
        required: true,
        trim: true,
    },
    organizerEmail: {
        type: String,
        required: true,
        trim: true,
    },
    categories: {
        type: [Number],
        required: true,
        trim: true,
    },
    tournamentEvents:{
        type:[tournamentEvent],
        required:true,
        trim: true,
    },
    flag: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    url: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date,
        required: true,
        trim: true,
    },
    endDate: {
        type: Date,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: ['Check-in', 'Live', 'Closed'],
        default: 'Check-in'
    },
    // eventType: {
    //     type: String,
    //     required: true
    // },
});

const Tournament = mongoose.models.Tournament || mongoose.model("Tournament", tournamentSchema, "tournament");

export default Tournament;