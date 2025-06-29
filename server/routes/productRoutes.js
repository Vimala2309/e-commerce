const express = require("express");
const router = express.Router();
const upload = require("../utils/upload");
const { addProduct, getProducts, deleteProduct } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, upload.single("image"), addProduct);
router.get("/", getProducts);
router.delete("/:id", authMiddleware, deleteProduct);

module.exports = router;
