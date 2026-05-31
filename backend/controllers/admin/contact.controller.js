const ContactForm = require("../../models/contactform");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");
const getContacts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(50, parseInt(req.query.limit, 10) || 10);
  const skip = (page - 1) * limit;

  const [contacts, total] = await Promise.all([
    ContactForm.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ContactForm.countDocuments(),
  ]);

  res.json({
    success: true,
    data: contacts,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await ContactForm.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");
  res.json({ success: true, data: contact });
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await ContactForm.findById(req.params.id);
  if (!contact) throw new ApiError(404, "Contact not found");

  await ContactForm.findByIdAndDelete(req.params.id);

  res.json({ success: true, message: "Contact deleted" });
});

module.exports = { getContacts, getContact, deleteContact };
