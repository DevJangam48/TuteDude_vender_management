const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    unique: true,
    minlength: 6,
    select: false, // Don't return password by default
  },
  role: {
    type: String,
    enum: ["vendor", "admin"],
    default: "vendor",
  },
  phone: {
    type: String,
    required: [true, "Please add a phone number"],
  },
  address: {
    street: { type: String, required: [true, "Please add a street"] },
    city: {
      type: String,
      required: [true, "Please add a city"],
      default: "Pune",
    },
    state: {
      type: String,
      required: [true, "Please add a state"],
      default: "Maharashtra",
    },
    zipCode: { type: String, required: [true, "Please add a zip code"] },
    zone: { type: String, required: [true, "Please add a delivery zone"] },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", UserSchema);
