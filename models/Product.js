const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    frontSide: { type: String, required: true },
    backSide: { type: String, required: true },
    displayImg: { type: String, required: true },
    sizes: [
      {
        size: { type: String},
        quantity: { type: Number },
      },
    ],
    isAvailable: { type: Boolean, default: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
