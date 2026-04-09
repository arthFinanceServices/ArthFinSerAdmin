const employeedetailsModels = require("../models/employeedetails.models");

async function getEmployeeDetails(req, res) {
  try {
    const dataOfEmployee = await employeedetailsModels.find({});
    res.status(200).json({
      message: "Employee details fteched successfully",
      data: dataOfEmployee,
    });
  } catch (error) {
    console.log(error);
  }
}

async function updateStatus(req, res) {
  try {
    const id = req.params.id;
    const { isActive } = req.body;

    if (typeof isActive !== "boolean") {
      return res.status(400).json({ message: "isActive must be boolean" });
    }

    const apiResponse = await employeedetailsModels.findByIdAndUpdate(
      id,
      { isActive },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!apiResponse) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "status updated successfully",
      data: apiResponse,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Update failed", error: error.message });
  }
}

async function addEmployee(req, res) {
  try {
    const { email, password, isActive, fullName } = req.body;

    if (!email || !password || !isActive || !fullName) {
      return res.status(400).json({
        message: "All fileds are required",
      });
    }

    const isEmployeeExist = await employeedetailsModels.findOne({ email });

    if (isEmployeeExist) {
      return res.status(409).json({
        message: "Employee with this email already exist",
      });
    }

    const newEmployee = await employeedetailsModels.create({
      email,
      password,
      isActive,
      fullName,
    });
    return res.status(201).json({
      message: "Employee created successfully",
      newEmployee,
    });
  } catch (error) {}
}

module.exports = { updateStatus, getEmployeeDetails ,addEmployee };
