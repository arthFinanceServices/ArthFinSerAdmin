const Dealer = require("../models/dealer.models");

/**
 * ✅ Public API
 * Get dealer details by email
 * - No authentication
 * - Only returns data if dealer is ACTIVE
 */
async function getDealerByEmail(req, res) {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({
        message: "Dealer email is required",
      });
    }

    const dealer = await Dealer.findOne({ email });

    if (!dealer) {
      return res.status(404).json({
        message: "Dealer not found",
      });
    }

    // ✅ Check active status
    if (!dealer.isActive) {
      return res.status(403).json({
        message: "Dealer is inactive",
      });
    }

    // ✅ Return ONLY required fields
    return res.status(200).json({
      dealerCode: dealer.dealerCode,
      dealerName: dealer.dealerName,
      comment: dealer.comment,
      isActive: dealer.isActive,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to fetch dealer details",
    });
  }
}

module.exports = { getDealerByEmail };
