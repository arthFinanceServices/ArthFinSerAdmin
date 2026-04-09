const employeedetailsModels = require("../models/employeedetails.models");
const jwt = require("jsonwebtoken");
async function employeeLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }

    const isEmployeeExist = await employeedetailsModels.findOne({ email });

    if (!isEmployeeExist) {
      return res.status(401).json({
        message: "Unauthorized Access",
      });
    }

    if (!isEmployeeExist.isActive) {
      return res.status(401).json({
        message: "your account is disabled",
      });
    }

    if (isEmployeeExist.password !== password) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }

    const token = jwt.sign(
      { id: isEmployeeExist._id, user: "employee" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" },
    );

    //saving coookie
    res.cookie("token", token);
    return res.status(200).json({
      message: "user logged in successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { employeeLogin };
