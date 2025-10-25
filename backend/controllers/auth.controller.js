const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Login for admin
exports.loginAdmin = (req, res) => {
  const { email, password } = req.body;

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

  res.json({
    token,
    user: { email: process.env.ADMIN_EMAIL },
  });
};
// controllers/auth.controller.js

exports.logoutAdmin = (req, res) => {
  // If you want to handle blacklisting tokens, add logic here
  // For now, just tell the frontend to delete the token
  res.json({ message: "Logged out successfully" });
};

