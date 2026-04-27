const EmployeeDetails = require("../models/employeedetails.models");

async function getEmployeeProfile(req, res) {
  try {
    const employeeId = req.user.id; // from auth middleware

    const employee = await EmployeeDetails.findById(employeeId).select(
      "fullName email"
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      data: employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch employee profile",
    });
  }
}

module.exports = { getEmployeeProfile };