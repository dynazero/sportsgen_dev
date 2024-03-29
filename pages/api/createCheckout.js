import connectDB from "../../connectDB";
import Checkout from "../../model/Checkout";
import Participant from "../../model/Participant";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { createReadStream } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

connectDB();
//Create checkout and participant
const spacesEndpoint = "https://sgp1.digitaloceanspaces.com";
const s3Client = new S3Client({
  endpoint: spacesEndpoint,
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.SPACES_ACCESS_KEY,
    secretAccessKey: process.env.SPACES_SECRET_KEY,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

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
        team,
        paymentmethod,
        status
      } = fields;

      const registrationList = JSON.parse(fields.registration);

      const checkoutVerify = await Checkout.findOne({ tournamentId: tournamentId,team: team });
      if (checkoutVerify) {
        res.status(422).json({ message: "Team Already Registered" });
        return;
      }

      // Create an array to store participant IDs
      let participantIds = [];

      // Use a for-loop instead of forEach for better async/await handling
      for (let reg of registrationList) {
        try {
          const newParticipant = new Participant({
            tournamentId,
            team,
            athleteId: reg.athleteId,
            athleteName: reg.athleteName,
            imageURL: reg.athleteImageURL,
            eventName: reg.categoryName,
            eventKey: reg.eventKey,
            categoryKey: reg.categoryKey,
            country: reg.country,
            entryFee: reg.entryFee,
            status,
          });

          // Save the participant and get the saved document
          const savedParticipant = await newParticipant.save();

          // Push the ID of the saved document to the participantIds array
          participantIds.push(savedParticipant._id);

          // console.log("Saving registration:", reg);

        } catch (error) {
          console.error("Error saving registration to database:", error);
        }
      }

      if (!files.paymentproof) {
        res.status(400).json({ message: "No proof of payment uploaded" });
        return;
      }

      const file = files.paymentproof
      const originalFileName = file.originalFilename
      const fileExtension = path.extname(originalFileName);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;

      const params = {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: `payment/${uniqueFileName}`,
        Body: createReadStream(file._writeStream.path),
        ACL: "public-read",
      };

      try {
        // console.log("Uploading file:", uniqueFileName);
        await s3Client.send(new PutObjectCommand(params));

        const newCheckout = new Checkout({
          tournamentId,
          team,
          registration: registrationList,
          paymentMethod: paymentmethod,
          paymentProof: uniqueFileName,
          status,
        });

        const savedCheckoutId = await newCheckout.save();
        res.status(201).json({ message: "Checkout created successfully", id: savedCheckoutId._id });
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
