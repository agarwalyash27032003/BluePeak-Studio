const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const {
  getContacts,
  getContact,
  deleteContact,
} = require("../../controllers/admin/contact.controller");

const router = express.Router();
router.use(protect);

router.get("/", getContacts);
router.get("/:id", getContact);
router.delete("/:id", deleteContact);

module.exports = router;
