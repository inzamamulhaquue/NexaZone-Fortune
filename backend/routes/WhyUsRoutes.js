const express = require("express");
const router = express.Router();
const WhyUs = require("../models/WhyUs");

// Get Why Us data
router.get("/", async (req, res) => {
  try {
    const data = await WhyUs.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add / update Why Us data
router.post("/", async (req, res) => {
  try {
    let whyUs = await WhyUs.findOne();
    if (whyUs) {
      whyUs = Object.assign(whyUs, req.body);
      await whyUs.save();
      return res.json(whyUs);
    }
    whyUs = new WhyUs(req.body);
    await whyUs.save();
    res.status(201).json(whyUs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete Why Us data (optional)
router.delete("/:id", async (req, res) => {
  try {
    await WhyUs.findByIdAndDelete(req.params.id);
    res.json({ message: "Why Us deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
