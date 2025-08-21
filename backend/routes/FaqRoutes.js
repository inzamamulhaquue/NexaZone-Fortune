// backend/routes/faqRoutes.js
const express = require("express");
const router = express.Router();
const Faq = require("../models/Faq");

// Get all FAQs
router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ createdAt: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new FAQ
router.post("/", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const newFaq = new Faq({ question, answer });
    await newFaq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a FAQ
router.put("/:id", async (req, res) => {
  try {
    const { question, answer } = req.body;
    const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, { question, answer }, { new: true });
    res.json(updatedFaq);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a FAQ
router.delete("/:id", async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ message: "FAQ deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
