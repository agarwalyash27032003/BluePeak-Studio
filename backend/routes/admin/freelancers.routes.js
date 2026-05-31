const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const {
  getFreelancers,
  getFreelancer,
  getFreelancerProjects,
  getFreelancerPayments,
  recordFreelancerPayment,
  createFreelancer,
  updateFreelancer,
  deleteFreelancer,
} = require("../../controllers/admin/freelancer.controller");

const router = express.Router();
router.use(protect);

router.get("/", getFreelancers);
router.get("/:id/payments", getFreelancerPayments);
router.post("/:id/payments", recordFreelancerPayment);
router.get("/:id/projects", getFreelancerProjects);
router.get("/:id", getFreelancer);
router.post("/", createFreelancer);
router.put("/:id", updateFreelancer);
router.delete("/:id", deleteFreelancer);

module.exports = router;
