const Dealer = require("../models/dealer.models");

/**
 * ✅ Get all dealers (Admin Dashboard)
 */
async function getDealers(req, res) {
  try {
    const dealers = await Dealer.find({});

    return res.status(200).json({
      message: "Dealer details fetched successfully",
      data: dealers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch dealer details",
    });
  }
}

/**
 * ✅ Add new dealer (Admin Dashboard)
 */
async function addDealer(req, res) {
  try {
    const { dealerCode, dealerName, email, comment, isActive } = req.body;

    if (!dealerCode || !dealerName || !email || typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const existingDealer = await Dealer.findOne({ dealerCode });

    if (existingDealer) {
      return res.status(409).json({
        message: "Dealer with this code already exists",
      });
    }

    const newDealer = await Dealer.create({
      dealerCode,
      dealerName,
      email,
      comment,
      isActive,
    });

    return res.status(201).json({
      message: "Dealer created successfully",
      data: newDealer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to create dealer",
    });
  }
}

/**
 * ✅ Update dealer (ALL fields)
 * - dealerName
 * - email
 * - comment
 * - isActive
 */
async function updateDealer(req, res) {
  try {
    const { id } = req.params;
    const { dealerName, email, comment, isActive } = req.body;

    if (!dealerName || !email || typeof isActive !== "boolean") {
      return res.status(400).json({
        message: "All required fields must be provided",
      });
    }

    const updatedDealer = await Dealer.findByIdAndUpdate(
      id,
      {
        dealerName,
        email,
        comment,
        isActive,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedDealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    return res.status(200).json({
      message: "Dealer updated successfully",
      data: updatedDealer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to update dealer",
    });
  }
}

async function deleteDealer(req, res) {
  try {
    const { id } = req.params;

    const deletedDealer = await Dealer.findByIdAndDelete(id);

    if (!deletedDealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    return res.status(200).json({
      message: "Dealer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to delete dealer",
    });
  }
}

module.exports = {
  getDealers,
  addDealer,
  updateDealer,
  deleteDealer,
};




