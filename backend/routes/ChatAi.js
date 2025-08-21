const express = require("express");
const router = express.Router();
const ChatMessage = require("../models/ChatAi");

// Save user message
router.post("/send", async (req, res) => {
  try {
    const { name, email, mobile, message } = req.body;
    const newMsg = new ChatMessage({ name, email, mobile, message, sender: "user" });
    await newMsg.save();
    res.status(200).json({ success: true, msg: "Message saved", data: newMsg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all chat messages
router.get("/messages", async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
