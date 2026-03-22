// controllers/contactForm.controller.js

const ContactForm = require("../models/contactform");

module.exports.createContactForm = async (req, res) => {
  try {
    console.log("Incoming:", req.body);

    const { name, contactNo, email, message } = req.body;

    // ✅ Validation
    if (!name || !contactNo || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const saved = await ContactForm.create({
      name,
      contactNo,
      email,
      message,
    });

    console.log("✅ SAVED:", saved);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully",
    });

  } catch (err) {
    console.error("❌ ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};