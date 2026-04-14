// models/dealer.models.js
const mongoose = require("mongoose");

const dealerSchema = new mongoose.Schema(
  {
    dealerCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dealerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    comment: {
      type: String,
      default: "",
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dealer", dealerSchema);
