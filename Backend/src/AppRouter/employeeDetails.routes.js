const express = require("express");
const {
  getEmployeeDetails,
  updateStatus,
  addEmployee,
} = require("../controllers/employee.details.controller");
const { adminLogin } = require("../controllers/admin.controllers");
const { employeeLogin } = require("../controllers/employee.controllers");
const { authMiddleWare } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/getEmployeeData", authMiddleWare, getEmployeeDetails);
router.patch("/updateStatus/:id", updateStatus);
router.post("/login/admin", adminLogin);
router.post("/login/employee", employeeLogin);
router.post("/addEmployee", addEmployee);
router.get("/check-auth", authMiddleWare, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

router.get("/form-url", (req, res) => {
  res.status(200).json({
    url: process.env.FORM_URL,
  });
});

module.exports = router;
