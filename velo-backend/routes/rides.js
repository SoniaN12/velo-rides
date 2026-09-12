const express = require("express");
const Ride = require("../models/Ride");
const auth = require("../middleware/auth");

const router = express.Router();


// CREATE A RIDE
router.post("/", auth, async (req, res) => {
  try {
    const {
      pickup,
      destination,
      rideType,
      fare,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (
      !pickup ||
      !destination ||
      !rideType ||
      !fare ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Missing ride information.",
      });
    }

    const ride = await Ride.create({
      user: req.userId,
      pickup,
      destination,
      rideType,
      fare,
      paymentMethod,
      paymentStatus:
        paymentStatus || "Pending",
      rideStatus: "Searching",
    });

    return res.status(201).json({
      message: "Ride booked successfully.",
      ride,
    });

  } catch (error) {
    console.error("Create ride error:", error);

    return res.status(500).json({
      message: "Could not book ride.",
    });
  }
});


// GET ONLY THE LOGGED-IN USER'S RIDES
router.get("/my-rides", auth, async (req, res) => {
  try {

    const rides = await Ride.find({
      user: req.userId,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      rides,
    });

  } catch (error) {
    console.error("Get rides error:", error);

    return res.status(500).json({
      message: "Could not retrieve rides.",
    });
  }
});


// GET ONE RIDE
router.get("/:id", auth, async (req, res) => {
  try {

    const ride = await Ride.findOne({
      _id: req.params.id,
      user: req.userId,
    });

    if (!ride) {
      return res.status(404).json({
        message: "Ride not found.",
      });
    }

    return res.json({
      ride,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Could not retrieve ride.",
    });
  }
});

module.exports = router;
