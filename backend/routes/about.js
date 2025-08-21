// backend/routes/about.js
const express = require("express");
const About = require("../models/About");
const router = express.Router();

// GET about config (make if not exists)
router.get("/", async (req, res) => {
  try {
    let doc = await About.findOne();
    if (!doc) doc = await About.create({});
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE about config
router.put("/", async (req, res) => {
  try {
    // (Optional) Enforce 10 max items server-side too
    if (req.body.features && req.body.features.length > 10) {
      return res.status(400).json({ error: "Max 10 features allowed." });
    }
    if (req.body.benefits && req.body.benefits.length > 10) {
      return res.status(400).json({ error: "Max 10 benefits allowed." });
    }

    const updated = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
