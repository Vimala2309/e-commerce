const Order = require("../models/Order");

// ✅ Place a new order
exports.placeOrder = async (req, res) => {
  const { productId, productName, quantity, size, address, imageUrl } = req.body;
  const userId = req.user.userId;

  try {
    const newOrder = new Order({
      userId,
      productId,
      productName,
      quantity,
      size,
      address,
      imageUrl,
      orderDate: new Date(),
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ message: "Failed to place order", error: err.message });
  }
};

// ✅ Get orders for the logged-in user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId })
      .sort({ orderDate: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders", error: err.message });
  }
};

// ✅ Get all orders (admin) - includes user info
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "username email") // 🔥 populate username & email from User
      .sort({ orderDate: -1 });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch all orders", error: err.message });
  }
};
