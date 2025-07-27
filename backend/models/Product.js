const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
    trim: true,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  marketPrice: {
    type: Number,
    required: [true, "Please add a market price"],
  },
  groupPrice: {
    type: Number,
    required: [true, "Please add a group price"],
  },
  unit: {
    type: String,
    required: [true, "Please specify the unit (e.g., kg, piece)"],
    default: "kg",
  },
  isActive: {
    type: Boolean,
    default: true, // To control if the product is available for today's order
  },
});

module.exports = mongoose.model("Product", ProductSchema);
