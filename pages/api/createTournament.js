import connectDB from "../../connectDB";
import Tournament from "../../model/Tournament";
import formidable from "formidable";

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
        eventId,
        eventName,
        eventLogo,
        organizer,
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
        startTime
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
          startTime
        });

        const savedTournament =  await newTournament.save();
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