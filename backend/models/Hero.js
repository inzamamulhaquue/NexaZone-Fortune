const mongoose = require("mongoose");

const HeroSchema = new mongoose.Schema(
  {
    backgroundImage: { type: String, default: "/images/burj1.jpg" }, // served from frontend/public
    title: { type: String, default: "Start Your Business in Dubai" },
    subtitle: { type: String, default: "Fast, reliable company setup in UAE Free Zones & Mainland." },
    chatButtonText: { type: String, default: "Chat with Us" },
    formTitle: { type: String, default: "Talk to our Business Setup Expert" },
    placeholders: {
      name: { type: String, default: "Name" },
      email: { type: String, default: "Email" },
      mobile: { type: String, default: "Mobile Number" },
      bussiness: { type: String, default: "Business Name" },
      location: { type: String, default: "Business Location" },
      immediately: { type: String, default: "When do you want to start?" },
      message: { type: String, default: "Message (optional)" }
    },
    submitText: { type: String, default: "SUBMIT" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hero", HeroSchema);
