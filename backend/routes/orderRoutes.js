const express = require("express");
const { createOrder, getMyOrders } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

router.post("/createOrder", protect, createOrder);
router.get("/myorders", protect, getMyOrders);

module.exports = router;
