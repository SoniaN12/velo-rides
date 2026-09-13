const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email,
      password: hashedPassword,
    });

    await user.save();

    console.log("New Velo user registered:", email);

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: "Registration failed.",
    });
  }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    console.log("Login request received");

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      console.log("Login failed: user not found:", email);

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatches) {
      console.log("Login failed: incorrect password");

      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        message: "Server authentication configuration error.",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    console.log("Login successful:", email);

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login failed.",
    });
  }
});

module.exports = router;
