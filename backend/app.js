// app.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Middleware
app.use(cors({
  origin: "https://bluepeak-studio-frontend.onrender.com/", // 🔥 replace this
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ✅ Routes
const contactFormRoute = require("./routes/contactForm.routes");
app.use("/api/contact", contactFormRoute);

// ✅ 404 handler (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});