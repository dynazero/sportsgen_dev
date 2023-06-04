import connectDB from "../../connectDB"
import Team from "../../model/teamSchema"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const team = await Team.find({ registeredEmail: req.query.registeredEmail })
      res.status(200).json({ data: team })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
