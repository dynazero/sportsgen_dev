import connectDB from "../../connectDB"
import Official from "../../model/officialModel"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const official = await Official.find({ team: req.query.team })
      res.status(200).json({ data: official })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
