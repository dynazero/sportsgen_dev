import connectDB from "../../connectDB";
import TournamentResult from "../../model/TournamentResult";
import formidable from "formidable";
import { createReadStream } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

connectDB();


export const config = {
  api: {
    bodyParser: false,
  },
};

function convertToPST(date) {
  const offset = 8 * 60 * 60 * 1000; // Offset in milliseconds for UTC+8
  return new Date(date.getTime() + offset);
}

export default async (req, res) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        res.status(500).json({ message: "Error parsing form data" });
        return;
      }

      const {
        tournamentId,
        championId,
        champion,
      } = fields;

      const matchDetails = JSON.parse(fields.matchDetails);

      const tournamentVerify = await TournamentResult.findOne({ tournamentId: tournamentId });
      if (tournamentVerify) {
        res.status(422).json({ message: "Tournament already exists" });
        return;
      }

     
      try {
         const newTournamentResult = new TournamentResult({
          tournamentId,
          champion: {
            participantId: championId,
            participant: champion,
          },
          matches: matchDetails,
        });

        await newTournamentResult.save();
        res.status(201).json({ message: "Tournament Result saved successfully" });
      } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file", error: error.message });
      }
    });
  } else {
    // Handle non-POST requests
    res.status(405).json({ message: "Method Not Allowed" });
  }
};
