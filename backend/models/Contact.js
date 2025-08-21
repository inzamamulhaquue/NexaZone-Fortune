// backend/models/Contact.js
const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true }
});

const ContactSchema = new mongoose.Schema({
  heading: { type: String, required: true },
  email: { type: String, required: true },
  phones: [{ type: String, required: true }],
  locations: [LocationSchema]
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
