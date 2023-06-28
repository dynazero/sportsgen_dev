import connectDB from "../../connectDB"
import Athlete from "../../model/Athlete"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const team = await Athlete.find({team: req.query.team})
      res.status(200).json({ data: team })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
