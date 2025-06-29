const express = require("express");
const router = express.Router();
const { addToCart, getCartItems, removeCartItem } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addToCart);         // Add to cart
router.get("/", authMiddleware, getCartItems);       // Get cart items
router.delete("/:id", authMiddleware, removeCartItem); // Remove item

module.exports = router;
