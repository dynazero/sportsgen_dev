import connectDB from "../../connectDB"
import Participants from "../../model/Participant"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const { tournamentId } = req.query;
      const participants = await Participants.find({ tournamentId });
      res.status(200).json({ data: participants })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
