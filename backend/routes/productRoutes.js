const express = require("express");
const {
  getProducts,
  createProduct,
  createOrder,
  getMyOrders,
  getAllProductsAdmin,
  updateProduct,
} = require("../controllers/productController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/getProducts", getProducts);
router.post("/createProduct", protect, authorize("admin"), createProduct);
router.post("/createOrder", protect, createOrder);
router.get("/getOrders", protect, getMyOrders);
router.get(
  "/getAllProductsAdmin",
  protect,
  authorize("admin"),
  getAllProductsAdmin
);
router.put("/updateProduct/:id", protect, authorize("admin"), updateProduct);
module.exports = router;
