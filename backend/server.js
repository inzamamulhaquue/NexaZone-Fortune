const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const topbarRoutes = require('./routes/Topbar.js');
const headerRoutes = require('./routes/headerRoutes.js');
const heroRoutes = require("./routes/hero.js");
const aboutRoutes = require("./routes/about.js");
const factRoutes = require("./routes/factRoutes.js");
const WhyUsRoutes = require("./routes/WhyUsRoutes.js");
const faqRoutes = require("./routes/FaqRoutes.js");
const ContactRoutes = require("./routes/ContactRoutes.js");

const ChatAiRoutes = require("./routes/ChatAi.js");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use("/api/topbar", topbarRoutes);
app.use("/api/header", headerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/facts", factRoutes);
app.use("/api/whyus", WhyUsRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/contact", ContactRoutes);

app.use("/api/chat", ChatAiRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
