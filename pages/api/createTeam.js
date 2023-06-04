import connectDB from "../../connectDB";
import Team from "../../model/teamSchema";
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
        registeredEmail,
        clubName,
        country,
      } = fields;

      const emailVerify = await Team.findOne({ registeredEmail: registeredEmail });
      if (emailVerify) {
        res.status(409).json({ message: "You already registered a Team" });
        return;
      }

      const teamVerify = await Team.findOne({ clubName: clubName });
      if (teamVerify) {
        res.status(409).json({ message: "Team already exists" });
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
        Key: `teamLogos/${originalFileName}`,
        Body: createReadStream(file._writeStream.path),
        ACL: "public-read",
      };

      try {
        console.log("Uploading file:", uniqueFileName);
        await s3Client.send(new PutObjectCommand(params));

        const newTeam = new Team({
          registeredEmail,
          clubName,
          country,
          originalFileName: originalFileName,
        });

        await newTeam.save();
        res.status(201).json({ message: "Team created successfully" });
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
