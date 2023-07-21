import connectDB from "../../connectDB"
import Tournament from "../../model/Tournament"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const { eventId } = req.query;
      const tournament = await Tournament.find({ eventId });
      res.status(200).json({ data: tournament })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
