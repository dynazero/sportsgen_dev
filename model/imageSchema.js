import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);