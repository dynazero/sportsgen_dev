import connectDB from "../../connectDB"
import Profile from "../../model/Profile"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const profile = await Profile.find({ email: req.query.email})
      res.status(200).json({ data: profile })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
