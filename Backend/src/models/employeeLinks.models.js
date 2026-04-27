// models/employeeLinks.models.js
const mongoose = require("mongoose");

const employeeLinkSchema = new mongoose.Schema(
  {
    employeeEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,               // ✅ fast search
    },

    linkName: {
      type: String,
      required: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdBy: {
      type: String,              // admin email
      trim: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmployeeLink", employeeLinkSchema);