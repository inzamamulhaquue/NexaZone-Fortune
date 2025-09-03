const mongoose = require("mongoose");

const topBarSchema = new mongoose.Schema(
  {
    openHours: { type: String, default: "9am - 6pm" },
    phoneNumbers: { type: [String], default: [] },
    email: { type: String, default: "" },
    socialLinks: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TopBar", topBarSchema);

