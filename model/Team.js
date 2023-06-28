import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    registeredEmail: {
        type: String,
        required: true,
        trim: true,
    },
    clubName: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    teamLogo: {
        type: String,
        required: true, 
    }  
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema, "teams");

export default Team;

