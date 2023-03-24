import { uploadSingleImage } from './uploadMiddleware';
import connectDB from '../../connectDB';
import Image from '../../model/imageSchema';

connectDB();

export default async (req, res) => {
  if (req.method === 'POST') {
    uploadSingleImage(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'File upload error', error: err.message });
      }

      const imageURL = req.file.location;
      const newImage = await new Image({ imageURL }).save();
      res.status(200).json({ message: 'Image Upload Completed', imageURL });
    });
  } else {
    res.status(405).json({ message: 'Method is Not Allowed' });
  }
};