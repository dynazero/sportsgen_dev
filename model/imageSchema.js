import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  imageURL: {
    type: String,
    required: true,
  },
});

module.exports = imageSchema;
