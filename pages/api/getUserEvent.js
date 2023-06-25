import connectDB from "../../connectDB"
import Event from "../../model/Event"
// import { ObjectId } from 'mongodb';

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      // currently filtered with event - you can rmv to retrieve all
      const event = await Event.findById( req.query.id )
      res.status(200).json({ data: event })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
