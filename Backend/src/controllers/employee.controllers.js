const employeedetailsModels = require("../models/employeedetails.models");
const jwt = require("jsonwebtoken");

async function employeeLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const employee = await employeedetailsModels.findOne({ email });

    if (!employee) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    if (!employee.isActive) {
      return res.status(401).json({
        message: "Your account is disabled",
      });
    }

    if (employee.password !== password) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }

    // ✅ IMPORTANT FIX: use `role`, not `user`
    const token = jwt.sign(
      { id: employee._id, role: "employee" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    // ✅ Proper cookie config for local + cloud
    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,                 // true on Render, false locally
      sameSite: isProduction ? "none" : "lax",
      path: "/",
    });

    return res.status(200).json({
      message: "Employee logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { employeeLogin };
