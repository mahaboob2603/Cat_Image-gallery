require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const catRoutes = require("./routes/catRoutes");

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Cat Gallery API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/cats", catRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});