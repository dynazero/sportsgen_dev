import connectDB from "../../connectDB"
import Profile from "../../model/profileModel"

connectDB()

export default async (req, res) => {

    try{
        if (req.method === "POST") {
            const { fname, lname, email } = req.body
            const emailVerify = await Profile.findOne({ email: email })

            if(emailVerify){
                res.status(422).json({message: "Email already exist"})
            }

            // console.log(fname, lname, email)
            const newProfile = await new Profile({ fname: fname, lname: lname, email: email }).save()
            res.status(200).json({message: "Profile Verification Completed"})
        }

    }catch (error){
         console.log(error)
    }
}
