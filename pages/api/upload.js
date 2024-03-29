import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import formidable from 'formidable';
import { createReadStream } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const spacesEndpoint = "https://sgp1.digitaloceanspaces.com"
const s3Client = new S3Client({
    endpoint: spacesEndpoint,
    region: 'sgp1',
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

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method not allowed' });
        return;
    }

    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error('Form parse error:', err);
            res.status(500).json({ message: 'Error parsing form data' });
            return;
        }

        if (!files.image) {
            res.status(400).json({ message: 'No file uploaded' });
            return;
        }

        const file = files.image;
        // const originalFileName = path.basename(file._writeStream.path);
        const originalFileName = file.originalFilename
        const fileExtension = path.extname(originalFileName);
        const uniqueFileName = `${uuidv4()}${fileExtension}`;
        
        const params = {
            Bucket: process.env.DO_SPACES_BUCKET,
            // Key: `uploads/${uniqueFileName}`,
            Key: `uploads/${originalFileName}`,
            Body: createReadStream(file._writeStream.path),
            ACL: 'public-read',
        };

        try {
            // console.log('Uploading file:', uniqueFileName);
            console.log(originalFileName)
            await s3Client.send(new PutObjectCommand(params));
            res.status(201).json({ message: 'File uploaded successfully' });
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ message: 'Error uploading file', error: error.message });
        }
    });
}
