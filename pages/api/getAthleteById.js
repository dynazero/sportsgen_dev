import connectDB from "../../connectDB"
import Athlete from "../../model/Athlete"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
    const ids = req.query.id.split(",");
      
      const team = await Athlete.find({
        _id: { $in: ids }
      });

      res.status(200).json({ data: team });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
