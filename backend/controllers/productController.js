const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true });
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { orderItems, deliveryZone } = req.body;

  if (!orderItems || orderItems.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "No order items provided" });
  }

  if (!deliveryZone) {
    return res
      .status(400)
      .json({ success: false, message: "Delivery zone is required" });
  }

  try {
    let totalAmount = 0;
    const items = await Promise.all(
      orderItems.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product with id ${item.product} not found`);
        }
        totalAmount += item.quantity * product.groupPrice;
        return {
          product: item.product,
          name: product.name,
          quantity: item.quantity,
          price: product.groupPrice,
        };
      })
    );

    const order = new Order({
      user: req.user.id,
      items: items,
      totalAmount: totalAmount,
      deliveryZone: deliveryZone,
    });

    const createdOrder = await order.save();
    res.status(201).json({ success: true, data: createdOrder });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ success: false, message: err.message || "Server Error" });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      orderDate: -1,
    });
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, count: products.length, data: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the modified document
      runValidators: true, // Run schema validators
    });

    res.status(200).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
