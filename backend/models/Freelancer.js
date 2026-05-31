const mongoose = require("mongoose");
const { PROJECT_TYPES } = require("./Project");

const AVAILABILITY = ["Available", "Busy", "Unavailable"];

const freelancerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    skills: [{ type: String, enum: PROJECT_TYPES }],
    contactNumber: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    pricing: { type: String, trim: true },
    availabilityStatus: { type: String, enum: AVAILABILITY, default: "Available" },
    totalProjectsAssigned: { type: Number, default: 0, min: 0 },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

freelancerSchema.index({ name: "text", email: "text" });

module.exports = mongoose.model("Freelancer", freelancerSchema);
module.exports.AVAILABILITY = AVAILABILITY;
module.exports.SKILL_OPTIONS = PROJECT_TYPES;
