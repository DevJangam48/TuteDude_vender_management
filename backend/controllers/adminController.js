const Order = require("../models/Order");
const User = require("../models/User");
const mongoose = require("mongoose"); // Import mongoose for ObjectId

exports.getAggregatedOrders = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const aggregation = await Order.aggregate([
      { $match: { orderDate: { $gte: startOfDay, $lt: endOfDay } } },
      { $unwind: "$items" },
      {
        $group: {
          _id: {
            zone: "$deliveryZone",
            productId: "$items.product",
          },
          productName: { $first: "$items.name" },
          totalQuantity: { $sum: "$items.quantity" },
          pricePerUnit: { $first: "$items.price" },
          unit: { $first: "$productDetails.unit" },
          vendorCount: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "_id.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$_id.zone",
          products: {
            $push: {
              productId: "$_id.productId",
              name: "$productName",
              totalQuantity: "$totalQuantity",
              pricePerUnit: "$pricePerUnit",
              unit: "$productDetails.unit",
              vendorCount: "$vendorCount",
              totalValue: { $multiply: ["$totalQuantity", "$pricePerUnit"] }, // Calculate total value
            },
          },
          zoneTotalValue: {
            $sum: { $multiply: ["$totalQuantity", "$pricePerUnit"] },
          },
        },
      },
      {
        $project: {
          // Reshape the final output
          _id: 0,
          zone: "$_id",
          products: "$products",
          zoneTotalValue: "$zoneTotalValue",
        },
      },
      { $sort: { zone: 1 } }, // Sort zones alphabetically
    ]);

    res.status(200).json({ success: true, data: aggregation });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAggregationDetails = async (req, res) => {
  const { zone, productId } = req.query;

  if (!zone || !productId) {
    return res
      .status(400)
      .json({ success: false, message: "Zone and Product ID are required" });
  }

  try {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const endOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1
    );

    const details = await Order.aggregate([
      // Find today's orders for the specific zone
      {
        $match: {
          orderDate: { $gte: startOfDay, $lt: endOfDay },
          deliveryZone: zone,
        },
      },
      // Unwind the items array to process each item individually
      { $unwind: "$items" },
      // Match only the items for the specific product
      { $match: { "items.product": new mongoose.Types.ObjectId(productId) } },
      // Lookup the user (vendor) details for each matching order
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "vendorDetails",
        },
      },
      { $unwind: "$vendorDetails" },
      // Project to shape the final output
      {
        $project: {
          _id: 0,
          vendor: {
            name: "$vendorDetails.name",
            phone: "$vendorDetails.phone",
            address: "$vendorDetails.address",
          },
          quantity: "$items.quantity",
          unit: "$items.unit", // Assuming unit is stored in order items
        },
      },
    ]);

    const productInfo = await Order.aggregate([
      { $match: { "items.product": new mongoose.Types.ObjectId(productId) } },
      { $unwind: "$items" },
      { $match: { "items.product": new mongoose.Types.ObjectId(productId) } },
      { $group: { _id: null, name: { $first: "$items.name" } } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        productName:
          productInfo.length > 0 ? productInfo[0].name : "Unknown Product",
        vendors: details,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: "vendor" })
      .select("-password")
      .sort({ createdAt: -1 });

    res
      .status(200)
      .json({ success: true, count: vendors.length, data: vendors });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
