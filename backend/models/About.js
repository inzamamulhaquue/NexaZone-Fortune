// backend/models/About.js
const mongoose = require("mongoose");

const StepSchema = new mongoose.Schema({
    number: { type: Number, required: true }, // 1,2,3...
    title: { type: String, required: true },
    text: { type: String, required: true }
});

const AboutSchema = new mongoose.Schema(
    {
        title: { type: String, default: "About Business Setup in Dubai" },
        intro: {
            type: String,
            default:
                "Setting up a business in Dubai is an attractive option due to the Emirate’s pro-business environment and tax advantages. However, the process involves several key steps. Our experts can help from choosing the right activity and jurisdiction to licensing."
        },
        features: {
            type: [String],
            default: [
                "Hassle-free business setup process",
                "Can do business anywhere globally",
                "Huge number of business opportunities",
                "Access skilled workforce",
                "Business-friendly environment",
                "No currency restrictions"
            ],
            validate: v => v.length <= 10
        },
        benefits: {
            type: [String],
            default: [
                "100% ownership",
                "100% repatriation on profits",
                "No limitation on visas",
                "Excellent tax benefits",
                "Easy office space availability",
                "Immigration facilities are trouble-free",
                "Time-saving business setup process",
                "Vast Opportunities",
                "Opportunity to take on government projects"
            ],
            validate: v => v.length <= 10
        },
        steps: {
            type: [StepSchema],
            default: [
                {
                    number: 1,
                    title: "Registration",
                    text:
                        "Set your interests and budget. We’ll guide you to the right free zone and its requirements in Dubai."
                },
                {
                    number: 2,
                    title: "Submission",
                    text:
                        "We’ll advise on required documents and all costs for free zone company setup."
                },
                {
                    number: 3,
                    title: "Handover",
                    text:
                        "Collect your approved Dubai Free Zone license and documents from our advisor."
                }
            ]
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
