import connectDB from "../../connectDB";
import Image from "../../model/imageSchema";
import { uploadSingleImage } from "./uploadMiddleware";

connectDB()

export default async (req, res) => {
  
    try {
      if (req.method === 'POST') {
        uploadSingleImage(req, res, async (err) => {
          if (err) {
            return res.status(500).json({
              message: 'File upload error',
              error: err.message, // Add this line to include the error message
            });
          }
  
          const imageURL = req.file.location;
          const newImage = await new Image({ imageURL }).save();
          res.status(200).json({ message: 'Image Upload Completed' });
        });
      } else {
        res.status(405).json({ message: 'Method is Not Allowed' });
      }
    } catch (error) {
      console.log('Error:', error.message);
      console.log('Error stack trace:', error.stack);
      res.status(500).json({ message: 'Server error' });
    }
  };