import connectDB from "../../connectDB"
import Event from "../../model/Event"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      const categories = await Event.find({ "startDate": { $gt: new Date() }, "eventStatus": "active" });

      res.status(200).json({ data: categories })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
