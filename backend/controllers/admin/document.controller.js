const Document = require("../../models/Document");
const Project = require("../../models/Project");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");
const { uploadToCloudinary, deleteFromCloudinary } = require("../../utils/uploadToCloudinary");

const getDocuments = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  const filter = { projectId };
  if (req.query.category) filter.category = req.query.category;

  const documents = await Document.find(filter).sort({ createdAt: -1 });
  res.json({ success: true, data: documents });
});

const uploadDocuments = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, "Project not found");

  if (!req.files?.length) throw new ApiError(400, "No files uploaded");
  const category = req.body.category || "Other Attachments";

  const docs = await Promise.all(
    req.files.map(async (file) => {
      const result = await uploadToCloudinary(file.buffer, "bluepeak/documents");
      return Document.create({
        projectId,
        fileName: file.originalname,
        fileUrl: result.secure_url,
        publicId: result.public_id,
        category,
        uploadedBy: req.admin.name,
      });
    })
  );

  res.status(201).json({ success: true, data: docs });
});

const deleteDocument = asyncHandler(async (req, res) => {
  const doc = await Document.findById(req.params.id);
  if (!doc) throw new ApiError(404, "Document not found");

  await deleteFromCloudinary(doc.publicId);
  await Document.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Document deleted" });
});

module.exports = { getDocuments, uploadDocuments, deleteDocument };
