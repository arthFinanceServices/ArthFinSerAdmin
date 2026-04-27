const EmployeeLink = require("../models/employeeLinks.models");
const EmployeeDetails = require("../models/employeedetails.models");

/**
 * ✅ Get all links for an employee (by email)
 * GET /employee-links?email=employee@email.com
 */
async function getEmployeeLinks(req, res) {
  try {
    let email;

    // ✅ Employee → fetch own links
    if (req.user.role === "employee") {
      const employee = await EmployeeDetails.findById(req.user.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      email = employee.email;
    }

    // ✅ Admin → fetch by query email
    if (req.user.role === "admin") {
      email = req.query.email;
    }

    if (!email) {
      return res.status(400).json({
        message: "Employee email is required",
      });
    }

    const links = await EmployeeLink.find({
      employeeEmail: email.toLowerCase(),
      isActive: true,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      data: links,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch employee links",
    });
  }
}/**
 * ✅ Add new link to an employee
 * POST /employee-links
 */
async function addEmployeeLink(req, res) {
  try {
    const { employeeEmail, linkName, url, isActive } = req.body;

    if (!employeeEmail || !linkName || !url) {
      return res.status(400).json({
        message: "Employee email, link name and URL are required",
      });
    }

    // ✅ ensure employee exists
    const employee = await EmployeeDetails.findOne({
      email: employeeEmail.toLowerCase(),
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    const newLink = await EmployeeLink.create({
      employeeEmail: employeeEmail.toLowerCase(),
      linkName,
      url,
      isActive: isActive ?? true,
      createdBy: req.user?.email || "admin", // optional
    });

    return res.status(201).json({
      message: "Employee link added successfully",
      data: newLink,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to add employee link",
    });
  }
}

/**
 * ✅ Update employee link
 * PATCH /employee-links/:id
 */
/**
 * ✅ Update employee link
 * ❌ employeeEmail CANNOT be updated
 * PATCH /employee-links/:id
 */
async function updateEmployeeLink(req, res) {
  try {
    const { id } = req.params;
    const { linkName, url, isActive } = req.body;

    // ✅ explicitly allow only editable fields
    const updatePayload = {};

    if (linkName) updatePayload.linkName = linkName;
    if (url) updatePayload.url = url;
    if (typeof isActive === "boolean") updatePayload.isActive = isActive;

    const updatedLink = await EmployeeLink.findByIdAndUpdate(
      id,
      updatePayload,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedLink) {
      return res.status(404).json({
        message: "Employee link not found",
      });
    }

    return res.status(200).json({
      message: "Employee link updated successfully",
      data: updatedLink,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update employee link",
    });
  }
}
/**
 * ✅ Delete employee link
 * DELETE /employee-links/:id
 */
async function deleteEmployeeLink(req, res) {
  try {
    const { id } = req.params;

    const deletedLink = await EmployeeLink.findByIdAndDelete(id);

    if (!deletedLink) {
      return res.status(404).json({
        message: "Employee link not found",
      });
    }

    return res.status(200).json({
      message: "Employee link deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete employee link",
    });
  }
}

module.exports = {
  getEmployeeLinks,
  addEmployeeLink,
  updateEmployeeLink,
  deleteEmployeeLink,
};