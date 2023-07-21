import mongoose from 'mongoose';
import connectDB from "../../connectDB"
import Event from "../../model/Event"
// import { ObjectId } from 'mongodb';

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "GET") {
      // Check if the provided ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        // If it's not, return a custom error message
        return res.status(400).json({ message: "Invalid event ID" })
      }
      // currently filtered with event - you can rmv to retrieve all
      const event = await Event.findById(req.query.id)
      // Check if the event data is null or undefined
      if (!event) {
        // If it is, return a custom error message
        return res.status(404).json({ message: "Event not found" })
      }
      res.status(200).json({ data: event })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
