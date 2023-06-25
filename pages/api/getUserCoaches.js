import connectDB from "../../connectDB"
import Coach from "../../model/Coach"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const coach = await Coach.find({ team: req.query.team })
      res.status(200).json({ data: coach })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
