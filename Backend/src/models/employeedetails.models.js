// models/employeedetails.models.js
const mongoose = require("mongoose");

const employeeDetailsSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,          // ✅ important
      lowercase: true,
      trim: true,
      index: true,           // ✅ faster lookup
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeDetails", employeeDetailsSchema);
