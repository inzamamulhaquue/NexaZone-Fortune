const mongoose = require("mongoose");

const BoxSchema = new mongoose.Schema({
  number: { type: String, required: true }, // e.g., "10,000+"
  title: { type: String, required: true }   // e.g., "Clients"
});

const WhyUsSchema = new mongoose.Schema({
  heading: { type: String, default: "Why Us?" },
  intro: {
    type: String,
    default:
      "With more than 12 years of experience in this field, we offer a one-stop-shop solution for all incorporation, licensing, and other related services. We guide entrepreneurs and organizations to ensure they build their businesses in the right jurisdiction and with the right company structure, in order to position themselves for long-term growth and success, while avoiding mistakes that can cost them time and money."
  },
  boxes: {
    type: [BoxSchema],
    default: [
      { number: "100+", title: "Clients" },
      { number: "12+", title: "Years of Experience" },
      { number: "5", title: "Locations" },
      { number: "15+", title: "Nationalities Served" },
      { Services:  "Business Setup" }
    //   { number: "20", title: "Diversified Staff Nationalities" }
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model("WhyUs", WhyUsSchema);
