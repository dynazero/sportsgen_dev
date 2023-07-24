import { now } from "mongoose";
import connectDB from "../../connectDB";
import Log from "../../model/Logs";
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
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err);
        res.status(500).json({ message: "Error parsing form data" });
        return;
      }

      const {
        tournamentId,
        categoryKey,
        logAccount,
        message,
      } = fields;

      const dateTime = new Date(now());
      const timeStamp = convertToPST(new Date(now())); //"hr:mm:ss" 24-hour time string.

      try {

        const newLog = new Log({
          tournamentId,
          categoryKey,
          logAccount,
          message,
          dateTime,
          timeStamp
        });

        const savedLog = await newLog.save();


        res.status(201).json({ message: "Log Saved" });
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
