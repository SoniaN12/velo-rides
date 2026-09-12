require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const paymentRoutes = require("./routes/payments");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Velo API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Velo backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:");
    console.error(error.message);
  });
