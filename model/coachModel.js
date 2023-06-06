import mongoose from "mongoose"

const coachSchema =  new mongoose.Schema({

    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    // email: {
    //     type: String,
    //     required: true,
    //     unique:true
    // },
    team: {
        type: String,
        required: true,
        unique:true
    },
    // profilePicture: {
    //     type: String,
    //     required: true, 
    // },
    documentId: {
        type: String,
        required: true, 
    },
    profileStatus: {
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

const Coach = mongoose.models.Coach || mongoose.model("Coach", coachSchema, "coach")

export default Coach;
