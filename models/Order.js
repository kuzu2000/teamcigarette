const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: {
          type: String,
        },
        name: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        frontSide: {
          type: String,
        },
        size: {
          type: String,
        },
        price: {
          type: String,
        },
      },
    ],
    total: { type: Number, required: true },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    tax: { type: Number, required: true },
    fullName: { type: String, required: true },
    homeAddress: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: Number, required: true },
    country: { type: String, required: true },
    status: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
