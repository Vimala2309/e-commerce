const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  size: [String], // e.g. ["S", "M", "L"]
  imageUrl: String, // ✅ Must match what's saved in the controller
  category: String,
  inStock: Boolean,
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
