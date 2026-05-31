const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const { getDashboard, getPL, globalSearch } = require("../../controllers/admin/analytics.controller");

const router = express.Router();
router.use(protect);

router.get("/dashboard", getDashboard);
router.get("/pl", getPL);
router.get("/search", globalSearch);

module.exports = router;
