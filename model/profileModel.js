import mongoose from "mongoose"

const profileSchema = mongoose.Schema({

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
    }
})

const Profile = mongoose.model("Profile", profileSchema)

// mongoose.models = {}
export default mongoose.models.Profile || mongoose.model("Profile", profileSchema)