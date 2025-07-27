const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        // Price per unit at the time of order
        type: Number,
        required: true,
      },
      name: {
        // Storing name for easier display later
        type: String,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Delivered", "Cancelled"],
    default: "Pending",
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  deliveryZone: {
    type: String,
    // Example: 'FC Road Zone'. This could be linked to the user or set at order time.
    required: [true, "Please specify a delivery zone"],
  },
});

module.exports = mongoose.model("Order", OrderSchema);
