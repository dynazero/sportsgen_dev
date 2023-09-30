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
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
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
        tournamentSocketId,
        championId,
        champion,
      } = fields;

      const matchDetails = JSON.parse(fields.matchDetails);
      const participantList = JSON.parse(fields.participantList);

      const tournamentVerify = await TournamentResult.findOne({ tournamentSocketId: tournamentSocketId });
      if (tournamentVerify) {
        res.status(422).json({ message: "Tournament already exists" });
        return;
      }

     
      try {
         const newTournamentResult = new TournamentResult({
          tournamentId,
          tournamentSocketId,
          champion: {
            participantId: championId,
            participant: champion,
          },
          matches: matchDetails,
          participantList: participantList,
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
