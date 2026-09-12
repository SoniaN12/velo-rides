const express = require("express");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

// Sandbox payment request
router.post("/momo/request", async (req, res) => {
  try {
    const { phone, amount, rideId } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({
        success: false,
        message: "Phone number and amount are required.",
      });
    }

    const transactionId = uuidv4();

    console.log(
      "Sandbox MoMo transaction:",
      transactionId
    );

    return res.status(200).json({
      success: true,
      transactionId,
      status: "SUCCESSFUL",
      message: "Sandbox payment completed successfully.",
      payment: {
        phone,
        amount,
        currency: "RWF",
        rideId: rideId || null,
      },
      sandbox: true,
    });
  } catch (error) {
    console.error("Payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Could not process payment.",
    });
  }
});

module.exports = router;
