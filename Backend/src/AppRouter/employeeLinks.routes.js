const express = require("express");
const router = express.Router();
const { authMiddleWare } = require("../middleware/auth.middleware");

const {
  getEmployeeLinks,
  addEmployeeLink,
  updateEmployeeLink,
  deleteEmployeeLink,
} = require("../controllers/employeeLinks.controllers");

router.get("/employee-links", authMiddleWare, getEmployeeLinks);
router.post("/employee-links", authMiddleWare, addEmployeeLink);
router.patch("/employee-links/:id", authMiddleWare, updateEmployeeLink);
router.delete("/employee-links/:id", authMiddleWare, deleteEmployeeLink);

module.exports = router;