import connectDB from "../../connectDB"
import Event from "../../model/eventSchema"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      //currently filtered with eventStatus - you can rmv to retrieve all
      const categories = await Event.find({ eventStatus: 'active' })
      res.status(200).json({ data: categories })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}