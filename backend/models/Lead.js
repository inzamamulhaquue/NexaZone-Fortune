const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    business: { type: String, trim: true },
    location: { type: String, trim: true },
    immediately: { type: String, trim: true },
    message: { type: String, trim: true },
    source: { type: String, default: "hero" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", LeadSchema);
