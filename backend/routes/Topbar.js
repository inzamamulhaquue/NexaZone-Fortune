const express = require("express");
const TopBar = require("../models/Topbar.js");
const router = express.Router();

// Get TopBar data
router.get("/", async (req, res) => {
  try {
    let topbar = await TopBar.findOne();
    if (!topbar) {
      topbar = await TopBar.create({});
    }
     // If socialLinks missing, add defaults
    if (!topbar.socialLinks) {
      topbar.socialLinks = { facebook: "", instagram: "", linkedin: "" };
    }

    // If other fields missing, add defaults too
    if (!topbar.openHours) topbar.openHours = "9am - 6pm";
    if (!topbar.email) topbar.email = "";

    await topbar.save();
    res.json(topbar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update TopBar data (admin only)
router.put("/", async (req, res) => {
    try {
        const updated = await TopBar.findOneAndUpdate({}, req.body, { new: true, upsert: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
