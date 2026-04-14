const mongoose = require("mongoose");

const employeeDetailsSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,   
      trim: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    password: {
      type: String,
      required: true,
      trim:true
    },
  },
  { timestamps: true },
);
  
module.exports = mongoose.model("EmployeeDetails", employeeDetailsSchema);
