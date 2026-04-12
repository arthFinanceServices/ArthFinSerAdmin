// src/controllers/admin.controllers.js
const jwt = require("jsonwebtoken");
const adminModels = require("../models/admin.models");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await adminModels.findOne({ email });
    if (!admin || admin.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,                  // ✅ false on localhost, true on Render
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
    });
  } catch (err) {
    return res.status(500).json({ message: "Login Error" });
  }
}

module.exports = { adminLogin };
