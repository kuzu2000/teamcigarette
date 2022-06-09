const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, uppercase: true },
    description: { type: String },
    image: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('News', newsSchema)