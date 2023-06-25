// models/User.js

const mongoose = require('mongoose');
const imageSchema = require('./imageSchema');

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
