const express = require("express");
const router = express.Router();
const Fact = require("../models/Fact");

// ================= Controller + Routes in One =================

// Get all facts
router.get("/", async (req, res) => {
  try {
    const facts = await Fact.find();
    res.json(facts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new fact
router.post("/", async (req, res) => {
  const { title, description } = req.body;
  try {
    const newFact = new Fact({ title, description });
    await newFact.save();
    res.status(201).json(newFact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete fact
router.delete("/:id", async (req, res) => {
  try {
    await Fact.findByIdAndDelete(req.params.id);
    res.json({ message: "Fact deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
