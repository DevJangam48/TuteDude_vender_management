const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    user = new User({
      name,
      email,
      password,
      role,
      phone,
      address,
    });

    await user.save();
    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email and password",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const sendTokenResponse = (user, statusCode, res) => {
  const payload = {
    id: user._id,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(statusCode).json({
    success: true,
    token,
    data: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};
