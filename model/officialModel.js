import mongoose from "mongoose"

const officialSchema =  new mongoose.Schema({

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

const Official = mongoose.models.Official || mongoose.model("Official", officialSchema, "officials")

export default Official;
