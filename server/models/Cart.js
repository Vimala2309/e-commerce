const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: String,
  quantity: Number,
  size: String,
  imageUrl: String, // ✅ Add this field
  addedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Cart", cartSchema);
