const express = require("express");
const { protect } = require("../../middleware/auth.middleware");
const upload = require("../../middleware/upload.middleware");
const {
  getProjects,
  getProject,
  getProjectSummary,
  createProject,
  updateProject,
  deleteProject,
  uploadProjectFiles,
} = require("../../controllers/admin/project.controller");

const router = express.Router();
router.use(protect);

router.get("/summary", getProjectSummary);
router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);
router.post("/:id/files", upload.array("files", 10), uploadProjectFiles);

module.exports = router;
