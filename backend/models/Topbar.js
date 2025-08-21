const mongoose = require("mongoose");

const topBarSchema = new mongoose.Schema({
  openHours: { type: String },
  phoneNumbers: [{ type: String }],
  email: { type: String },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model("TopBar", topBarSchema); // ✅ Correct
