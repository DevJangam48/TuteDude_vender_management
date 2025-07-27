const express = require("express");
const {
  getAggregatedOrders,
  getAggregationDetails,
  getAllVendors,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

router.get("/aggregation", protect, authorize("admin"), getAggregatedOrders);
router.get(
  "/aggregation/details",
  protect,
  authorize("admin"),
  getAggregationDetails
);
router.get("/vendors", protect, authorize("admin"), getAllVendors);
module.exports = router;
