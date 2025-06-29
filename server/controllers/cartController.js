const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, productName, quantity, size } = req.body;
  const userId = req.user.userId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newCartItem = new Cart({
      userId,
      productId,
      productName,
      quantity,
      size,
      imageUrl: product.imageUrl // ✅ Add the image URL here
    });

    const saved = await newCartItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart", error: err.message });
  }
};

// Get user's cart items
exports.getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.userId });
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart", error: err.message });
  }
};

// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove item", error: err.message });
  }
};
