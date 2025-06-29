const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  productId: String,
  productName: String,
  quantity: Number,
  size: String,
  address: { type: String, required: true },
  status: { type: String, default: "Processing" },
  imageUrl: { type: String }, // ✅ added image field
  orderDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Orders", orderSchema);
