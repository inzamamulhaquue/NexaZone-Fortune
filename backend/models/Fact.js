const mongoose = require("mongoose");

const factSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model("Fact", factSchema);
