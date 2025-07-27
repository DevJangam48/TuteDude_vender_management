const Order = require("../models/Order");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "Request body is required" });
  }
  const { orderItems, deliveryZone } = req.body;

  if (!orderItems || !Array.isArray(orderItems) || orderItems.length === 0) {
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

    // Process each item in the order to build the final 'items' array for the schema
    const items = await Promise.all(
      orderItems.map(async (item) => {
        // Find the product in the database to get the latest price and details
        const product = await Product.findById(item.product);
        if (!product) {
          // If a product isn't found, stop the process
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
      user: req.user.id, // The user ID comes from the 'protect' middleware
      items: items,
      totalAmount: totalAmount,
      deliveryZone: deliveryZone,
    });

    // Save the order to the database
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
