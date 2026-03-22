const express = require("express");
const router = express.Router();

const { createContactForm } = require("./contactForm.controller");

router.post("/", createContactForm);

module.exports = router;