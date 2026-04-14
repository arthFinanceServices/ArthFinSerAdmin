// src/AppRouter/employeeDetails.routes.js
const express = require("express");
const router = express.Router();

const {
  getEmployeeDetails,
  updateEmployee,
  addEmployee,
  deleteEmployee,
} = require("../controllers/employee.details.controller");

const { adminLogin } = require("../controllers/admin.controllers");
const { employeeLogin } = require("../controllers/employee.controllers");
const { authMiddleWare } = require("../middleware/auth.middleware");
// ✅ Delete employee
router.delete("/deleteEmployee/:id", authMiddleWare, deleteEmployee);
  
// 🔓 Public routes
router.post("/login/admin", adminLogin);
router.post("/login/employee", employeeLogin);

// 🔒 Protected Admin routes
router.get("/getEmployeeData", authMiddleWare, getEmployeeDetails);

router.post("/addEmployee", authMiddleWare, addEmployee);

// ✅ Update ALL employee fields (name, email, password, isActive)
router.patch("/updateEmployee/:id", authMiddleWare, updateEmployee);

// 🔒 Auth check (used by protected routes)
router.get("/check-auth", authMiddleWare, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// 🔓 Utility route
router.get("/form-url", (req, res) => {
  res.status(200).json({
    url: process.env.FORM_URL,
  });
});

module.exports = router;
