const express = require("express");
const { login, getMe, loginValidators } = require("../../controllers/admin/auth.controller");
const { protect } = require("../../middleware/auth.middleware");

const router = express.Router();

router.post("/login", loginValidators, login);
router.get("/me", protect, getMe);

module.exports = router;
