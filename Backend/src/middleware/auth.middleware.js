const jwt = require("jsonwebtoken");
const adminModels = require("../models/admin.models");

async function authMiddleWare(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const admin = await adminModels.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (admin.password !== password) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }

    // ✅ CREATE JWT
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // ✅ SET COOKIE (IMPORTANT)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,     // required for HTTPS (Render / Vercel)
      sameSite: "none", // required for cross-origin cookies
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
    });

  } catch (error) {
    return res.status(500).json({
      message: "Login Error",
    });
  }
}

module.exports = { authMiddleWare };
