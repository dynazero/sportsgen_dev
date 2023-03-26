import connectDB from "../../connectDB";
import Event from "../../model/eventSchema";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import formidable from "formidable";
import { createReadStream } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

connectDB();

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
        eventName,
        startDate,
        endDate,
        city,
        barangay,
        zip,
        address,
        entryFee,
      } = fields;

      const eventVerify = await Event.findOne({ eventName: eventName });
      if (eventVerify) {
        res.status(422).json({ message: "Event already exists" });
        return;
      }

      if (!files.image) {
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      const file = files.image;
      const originalFileName = file.originalFilename
      const fileExtension = path.extname(originalFileName);
      const uniqueFileName = `${uuidv4()}${fileExtension}`;
      console.log(originalFileName)

      const params = {
        Bucket: process.env.DO_SPACES_BUCKET,
        Key: `eventLogos/${originalFileName}`,
        Body: createReadStream(file._writeStream.path),
        ACL: "public-read",
      };

      try {
        console.log("Uploading file:", uniqueFileName);
        await s3Client.send(new PutObjectCommand(params));

        const newEvent = new Event({
          eventName,
          startDate: convertToPST(new Date(startDate)),
          endDate: convertToPST(new Date(endDate)),
          city,
          barangay,
          zip,
          address,
          entryFee,
          originalFileName: originalFileName,
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully" });
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
