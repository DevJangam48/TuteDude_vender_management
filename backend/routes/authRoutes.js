const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware"); // Import middleware

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe); // The 'protect' middleware is applied here

module.exports = router;
