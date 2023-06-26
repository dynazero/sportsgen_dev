import connectDB from "../../connectDB"
import Participant from "../../model/Participant"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      // Assume the ids are comma separated in the query string (e.g., "id1,id2,id3")
      const ids = req.query.id.split(",");
      
      const participants = await Participant.find({
        _id: { $in: ids }
      });

      res.status(200).json({ data: participants });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
