const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders } = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, placeOrder);        // Place order
router.get("/my", authMiddleware, getUserOrders);    // User's orders
router.get("/all", authMiddleware, getAllOrders);    // Admin view

module.exports = router;
