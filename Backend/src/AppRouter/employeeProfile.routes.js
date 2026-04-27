const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middleware/auth.middleware");
const { getEmployeeProfile } = require("../controllers/employeeProfile.controller");

router.get("/employee/me", authMiddleWare, getEmployeeProfile);

module.exports = router;