const express = require("express");
const router = express.Router();

const { createContactForm } = require("../controllers/contactForm.controller");

router.post("/", createContactForm);

module.exports = router;