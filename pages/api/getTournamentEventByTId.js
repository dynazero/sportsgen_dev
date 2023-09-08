import mongoose from 'mongoose';
import connectDB from "../../connectDB"
import TournamentEvent from "../../model/TournamentEvents"
import { getSession } from "next-auth/react";

connectDB()

export default async (req, res) => {


  const session = await getSession({ req }); // Get the session information

  if (!session) { // If there is no session
    res.status(401).json({ message: `Unauthorized}` });
    return; // Stop further execution
  }

  try {
    if (req.method === "GET") {
      // Check if the provided ID is a valid MongoDB ObjectID
      if (!mongoose.Types.ObjectId.isValid(req.query.id)) {
        // If it's not, return a custom error message
        return res.status(400).json({ message: "Invalid tournament ID" })
      }
      // currently filtered with event - you can rmv to retrieve all
      const events = await TournamentEvent.find({ tournamentId: req.query.id })
      // Check if the event data is null or undefined
      if (!events) {
        // If it is, return a custom error message
        return res.status(404).json({ message: "Tournament Event not found" })
      }
      res.status(200).json({ data: events })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" })
  }
}
