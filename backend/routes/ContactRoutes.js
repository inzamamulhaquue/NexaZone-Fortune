const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// GET contact info
router.get("/", async (req, res) => {
  try {
    const data = await Contact.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST / update contact info
router.post("/", async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (contact) {
      contact = Object.assign(contact, req.body);
      await contact.save();
      return res.json(contact);
    }
    contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE (optional)
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact info deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
