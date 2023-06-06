import connectDB from "../../connectDB";
import Profile from "../../model/profileModel"
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
                fname,
                lname,
                email,
                profileStatus
            } = fields;


            const emailVerify = await Profile.findOne({ email: email });
            if (emailVerify) {
                res.status(422).json({ message: "Profile already exists" });
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
                Key: `uploads/profiles/${originalFileName}`,
                Body: createReadStream(file._writeStream.path),
                ACL: "public-read",
            };

            try {
                console.log("Uploading file:", uniqueFileName);
                
                // Uploading file to S3
                const uploadResult = await s3Client.send(new PutObjectCommand(params));
            
                // Check if the file has been uploaded successfully
                if (!uploadResult) {
                    throw new Error('Failed to upload file to S3');
                }
            
                // If file uploaded successfully, save profile to DB
                const newProfile = new Profile({
                    fname: fname,
                    lname: lname,
                    email: email,
                    originalFileName: originalFileName,
                    profileStatus: profileStatus
                });
            
                await newProfile.save();
            
                res.status(201).json({ message: "Profile saved successfully" });
            
            } catch (error) {
                console.error("Error:", error);
                res.status(500).json({ message: "Error", error: error.message });
            }
        });
    } else {
        // Handle non-POST requests
        res.status(405).json({ message: "Method Not Allowed" });
    }
};
