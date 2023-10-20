import connectDB from "../../connectDB";
import Tournament from "../../model/Tournament";
import { now } from "mongoose";
import Event from "../../model/Event";
import Log from "../../model/Logs";
import formidable from "formidable";
import { getSession } from "next-auth/react";


connectDB();


export const config = {
  api: {
    bodyParser: false,
  },
};

function convertToPHT(date) {
  date.setUTCHours(16, 0, 0, 0); // Set the time to the start of the day in PHT (which is 16:00:00 in UTC)
  return date;
}

function convertToString(date) {
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
        eventId,
        eventName,
        eventLogo,
        organizer,
        organizerEmail,
        categories,
        flag,
        address,
        city,
        url,
        startDate,
        endDate,
        status
      } = fields;

      const tournamentEventsArray = JSON.parse(fields.tournamentEvents);

      const categoryKeys = tournamentEventsArray.map(event => ({
        _id: event._id,
        categoryKey: event.categoryKey
      }));

      const categoryNumbers = fields.categories.split(',').map(Number);

      const eventVerify = await Tournament.findOne({ eventId: eventId });
      if (eventVerify) {
        res.status(422).json({ message: "Tournament already exists" });
        return;
      }

      try {

        const newTournament = new Tournament({
          eventId,
          eventName,
          eventLogo,
          organizer,
          organizerEmail,
          flag,
          address,
          city,
          categories: categoryNumbers,
          tournamentEvents: tournamentEventsArray,
          url,
          startDate: convertToPHT(new Date(startDate)),
          endDate: convertToPHT(new Date(endDate)),
          status
        });


        const savedTournament = await newTournament.save();

        const tournamentId = savedTournament._id
        const logAccount = savedTournament.organizerEmail
        const message = "Tournament Created"


        const logPromises = categoryKeys.map((category) => {
          const newLog = new Log({
            tournamentId,
            tournamentEventId: category._id,
            categoryKey: category.categoryKey,
            logAccount,
            message,
          });

          return newLog.save(); // return the promise here
        });

        // Wait for all log saving promises to resolve
        await Promise.all(logPromises);

        // Update the corresponding event's status to 'closed'
        await Event.findByIdAndUpdate(eventId, { eventStatus: 'closed' });

        res.status(201).json({ message: "Tournament Initialized", tournamentId: savedTournament._id });
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
