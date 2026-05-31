const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload.middleware");
const {
  getExpenses,
  getExpense,
  getExpenseSummary,
  createExpense,
  updateExpense,
  deleteExpense,
} = require("../../controllers/admin/expense.controller");

const router = express.Router();
router.use(protect);

router.get("/summary", getExpenseSummary);
router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", upload.single("receipt"), createExpense);
router.put("/:id", upload.single("receipt"), updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;
