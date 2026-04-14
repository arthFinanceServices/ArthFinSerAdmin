const employeedetailsModels = require("../models/employeedetails.models");

/**
 * ✅ Get all employees (Admin Dashboard)
 * - Includes password as requested
 * - Proper error handling
 */
async function getEmployeeDetails(req, res) {
  try {
    const employees = await employeedetailsModels.find({}); // ✅ password INCLUDED

    return res.status(200).json({
      message: "Employee details fetched successfully",
      data: employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch employee details",
    });
  }
}

/**
 * ✅ Update ALL employee fields (Admin Dashboard)
 * - fullName
 * - email
 * - password
 * - isActive
 */
async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { fullName, email, password, isActive } = req.body;

    // ✅ Correct validations
    if (
      !fullName ||
      !email ||
      !password ||
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const updatedEmployee = await employeedetailsModels.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        password, // ⚠️ plain text (as requested)
        isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Employee update failed",
    });
  }
}

/**
 * ✅ Add new employee (Admin Dashboard)
 * - Fixed boolean validation bug
 * - Password stored as entered
 */
async function addEmployee(req, res) {
  try {
    const { email, password, isActive, fullName } = req.body;

    // ✅ Correct validation (isActive can be false)
    if (
      !email ||
      !password ||
      !fullName ||
      typeof isActive !== "boolean"
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingEmployee = await employeedetailsModels.findOne({ email });

    if (existingEmployee) {
      return res.status(409).json({
        message: "Employee with this email already exists",
      });
    }

    const newEmployee = await employeedetailsModels.create({
      email,
      password, // ⚠️ plain text (as requested)
      isActive,
      fullName,
    });

    return res.status(201).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create employee",
    });
  }
}


/**
 * ✅ Delete employee (Admin only)
 */
async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;

    const deletedEmployee = await employeedetailsModels.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete employee",
    });
  }
}

module.exports = {
  getEmployeeDetails,
  updateEmployee,
  addEmployee,
  deleteEmployee
};



