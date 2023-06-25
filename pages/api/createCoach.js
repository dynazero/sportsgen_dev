import connectDB from "../../connectDB";
import Coach from "../../model/Coach"
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
                //email,
                team,
                profileStatus,
                // events
            } = fields;


            // const emailVerify = await Athlete.findOne({ email: email });
            // if (emailVerify) {
            //     res.status(422).json({ message: "Athlete already exists" });
            //     return;
            // }

            // if (!files.image || !files.image1) {
            //     res.status(400).json({ message: "File(s) not uploaded" });
            //     return;
            // }

            //change to this ^ when profile picture is implemented
            if (!files.image1) {
                res.status(400).json({ message: "File(s) not uploaded" });
                return;
            }

            //profile picture commented out for future implementation - uncomment all *
            // const file = files.image;
            const file1 = files.image1;

            //*
            // const profilePicture = file.originalFilename;
            const documentId = file1.originalFilename;

            //*
            // if (!file || !file.originalFilename || !file1 || !file1.originalFilename) {
            //     console.log('file or file.name is undefined', file);
            //     res.status(400).json({ message: "File(s) not correctly uploaded" });
            //     return;
            // }

            //*
            // const fileExtension = path.extname(profilePicture);
            // const uniqueFileName = `${uuidv4()}${fileExtension}`;

            const fileExtension1 = path.extname(documentId);
            const uniqueFileName1 = `${uuidv4()}${fileExtension1}`;

            // console.log(fileExtension, 'fileExtension')
            // console.log(uniqueFileName, 'uniqueFileName')


            // console.log(fileExtension1, 'fileExtension1')
            // console.log(uniqueFileName1, 'uniqueFileName1')

            //*
            // const params = {
            //     Bucket: process.env.DO_SPACES_BUCKET,
            //     Key: `uploads/athletes/profile/${uniqueFileName}`,
            //     Body: createReadStream(file._writeStream.path),
            //     ACL: "public-read",
            // };

            const params1 = {
                Bucket: process.env.DO_SPACES_BUCKET,
                Key: `uploads/coaches/docs/${uniqueFileName1}`,
                Body: createReadStream(file1._writeStream.path),
                ACL: "public-read",
            };

            try {
                // console.log("Uploading file:", uniqueFileName);
                console.log("Uploading file:", uniqueFileName1);

                // Uploading file to S3
                //*
                // const uploadResult = await s3Client.send(new PutObjectCommand(params));
                const uploadResult1 = await s3Client.send(new PutObjectCommand(params1));

                // Check if the file has been uploaded successfully
                //*
                // if (!uploadResult) {
                //     throw new Error('Failed to upload file to S3');
                // }

                if (!uploadResult1) {
                    throw new Error('Failed to upload file to S3');
                }
                // If file uploaded successfully, save profile to DB
                const newCoach = new Coach({
                    fname: fname,
                    lname: lname,
                    // email: email,
                    team: team,
                   // profilePicture: uniqueFileName,  // Store unique file name
                    documentId: uniqueFileName1,  // Store unique file name
                    profileStatus: profileStatus,
                    // events: events,
                });

                await newCoach.save();

                res.status(201).json({ message: "Coach saved successfully" });

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
