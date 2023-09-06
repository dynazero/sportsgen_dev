import mongoose, { now } from "mongoose";
import connectDB from "../../connectDB";
import TournamentEvent from "../../model/TournamentEvents";
import formidable from "formidable";
import { getSession } from "next-auth/react";

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
    const session = await getSession({ req }); // Get the session information

    if (!session) { // If there is no session
        res.status(401).json({ message: 'Unauthorized' }); // Return 401 status for Unauthorized
        return; // Stop further execution
    }

    if (req.method === "POST") {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields) => {
            if (err) {
                console.error("Form parse error:", err);
                res.status(500).json({ message: "Error parsing form data" });
                return;
            }

            const {
                tournamentId,
                categoryName,
                categoryKey,
                status,
            } = fields;

            if (!mongoose.Types.ObjectId.isValid(tournamentId)) {
                return res.status(400).json({ message: "Invalid tournamentId" });
            }

            const objectIdTournamentId = new mongoose.Types.ObjectId(tournamentId);
            const startTime = convertToPST(new Date(now())); //"hr:mm:ss" 24-hour time string.

            try {

                const newTournamentEvent = new TournamentEvent({
                    tournamentId: objectIdTournamentId,
                    categoryName,
                    categoryKey,
                    status,
                    startTime,
                });

                const savedTournamentEvent = await newTournamentEvent.save();

                res.status(201).json({ message: "Tournament Event Saved" });
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
