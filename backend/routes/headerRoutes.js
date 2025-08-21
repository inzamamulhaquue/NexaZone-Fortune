const express = require("express");
const Header = require("../models/Header");
const router = express.Router();

// GET header data
router.get("/", async (req, res) => {
  try {
    let header = await Header.findOne();
    if (!header) {
      header = await Header.create({});
    }
    res.json(header);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE header data (admin)
router.put("/", async (req, res) => {
  try {
    const updated = await Header.findOneAndUpdate(
        {},
        req.body,
        { new: true, upsert: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
