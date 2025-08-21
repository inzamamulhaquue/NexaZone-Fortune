const mongoose = require("mongoose");

const HeaderSchema = new mongoose.Schema({
  logo: { type: String, default: "" },
  aboutButtonText: { type: String, default: "About Us" },
  whatsappLink: { type: String, default: "" },
  whatsappMessage: { type: String, default: "Hello, I’d like to know more!" },
  chatLink: { type: String, default: "" },
  contactButtonText: { type: String, default: "Contact Us" }
});

module.exports = mongoose.model("Header", HeaderSchema);
