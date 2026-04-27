const mongoose = require("mongoose");

const globalLinkSchema = new mongoose.Schema(
  {
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
      type: String,
      lowercase: true,
      trim: true, // admin email
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GlobalLink", globalLinkSchema);