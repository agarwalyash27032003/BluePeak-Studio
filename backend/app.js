// app.js

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 10000;

// ✅ Middleware
const allowedOrigins = [
  "https://bluepeak-studio-frontend.onrender.com",
  "https://bluepeakstudio.in"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST"],
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

const testimonialRoute = require("./routes/testimonialForm.routes");
app.use("/api/testimonial", testimonialRoute)

// ✅ 404 handler (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});