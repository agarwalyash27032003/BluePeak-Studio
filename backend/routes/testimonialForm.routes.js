const express = require("express");
const router = express.Router();

const { createTestimonial } = require("../controllers/testimonialForm.controller");

router.post("/", createTestimonial);

module.exports = router;