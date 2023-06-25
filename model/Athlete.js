import mongoose from "mongoose"

const athleteSchema =  new mongoose.Schema({

    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    team: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true, 
    },
    documentId: {
        type: String,
        required: true, 
    },
    profileStatus: {
        type: String,
        required: true,
        trim: true,
    },  
    // overallRank: {
    //     type: String,
    //     required: true,
    //     trim: true,
    // },  
    titles: {
        type: String,
        required: true,
        trim: true,
    },  
    // events: {
    //     type: [String],
    //     required: true,
    //     trim: true,
    // },  
})

const Athlete = mongoose.models.Athlete || mongoose.model("Athlete", athleteSchema, "athletes")

export default Athlete;
