const adminModels = require("../models/admin.models");
const jwt = require("jsonwebtoken");

async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;

    console.log("email : ", email);
    console.log("passwprd", password);

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isAdminExist = await adminModels.findOne({ email });

    if (!isAdminExist) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (isAdminExist.password !== password) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }
    const token = jwt.sign(
      { id: isAdminExist._id, user: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    //saving coookie
    res.cookie("token", token);

    return res.status(200).json({
      message: "Successfully logged in",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Login Error",
      error: error.message,
    });
  }
}

module.exports = { adminLogin };
