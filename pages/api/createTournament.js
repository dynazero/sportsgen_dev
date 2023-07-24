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

function convertToPST(date) {
  const offset = 8 * 60 * 60 * 1000; // Offset in milliseconds for UTC+8
  return new Date(date.getTime() + offset);
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
        flag,
        address,
        city,
        url,
        startDate,
        endDate,
        description,
        format,
        matchForThird,
        registrationFee,
        maxParticipants,
        startTime,
        status
      } = fields;

      const categoryKeys = JSON.parse(fields.categories);

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
          categories: categoryKeys,
          url,
          startDate: convertToPST(new Date(startDate)),
          endDate: convertToPST(new Date(endDate)),
          description,
          format,
          matchForThird,
          registrationFee,
          maxParticipants,
          startTime,
          status
        });


        const savedTournament = await newTournament.save();

        const tournamentId = savedTournament._id
        const logAccount = savedTournament.organizerEmail
        const message = "Tournament Created"
                
        //Log
        const dateTime = new Date(now());
        const timeStamp = convertToString(new Date(now())); //"hr:mm:ss" 24-hour time string.
        
       
          categoryKeys.forEach(async (categoryKey) => {
            const newLog = new Log({
              tournamentId,
              categoryKey,
              logAccount,
              message,
              dateTime,
              timeStamp
            });
        
            const savedLog = await newLog.save();
          });
          
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
