import connectDB from "../../connectDB"
import Log from "../../model/Logs"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const { tournamentId } = req.query;
      const tournament = await Log.find({ tournamentId });
      res.status(200).json({ data: tournament })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
