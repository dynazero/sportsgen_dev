import mongoose from "mongoose"

const profileSchema =  new mongoose.Schema({

    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    originalFileName: {
        type: String,
        required: true, 
    },
    profileStatus: {
        type: String,
        required: true,
        trim: true,
    },  
})

const Profile = mongoose.models.Profile || mongoose.model("Profile", profileSchema, "profiles")

export default Profile;
