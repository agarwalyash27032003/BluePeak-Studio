// controllers/contactForm.controller.js

const ContactForm = require('../models/contactform');

module.exports.createContactForm = async (req, res) => {
  try {
    const saved = await ContactForm.create(req.body);

    console.log("✅ SAVED:", saved);

    res.status(200).json({ success: true });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};