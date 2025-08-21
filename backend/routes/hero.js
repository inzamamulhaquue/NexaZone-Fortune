const express = require("express");
const Hero = require("../models/Hero");
const Lead = require("../models/Lead");

const router = express.Router();

// GET hero config (creates default if not exists)
router.get("/", async (req, res) => {
  try {
    let doc = await Hero.findOne();
    if (!doc) doc = await Hero.create({});
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE hero config (admin will call this)
router.put("/", async (req, res) => {
  try {
    const updated = await Hero.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST lead from hero form
router.post("/lead", async (req, res) => {
  try {
    const { name, mobile, email, business, location, immediately, message } = req.body;
    if (!name || !location || !mobile || !immediately) {
      return res.status(400).json({ error: "Name and mobile and location and start time are required." });
    }
    const lead = await Lead.create({ name, mobile,  email: email || "",business: business || "", location, immediately,  message: message || "", source: "hero" });
    res.json({ ok: true, leadId: lead._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// // POST lead from hero form with CAPTCHA verification
// router.post("/lead", async (req, res) => {
//   try {
//     // Destructure all fields from request body
//     const { name, mobile, email, bussiness, location, immediately, message, captchaToken } = req.body;

//     // 1️⃣ Verify required fields
//     if (!name || !mobile) {
//       return res.status(400).json({ error: "Name and mobile are required." });
//     }

//     // 2️⃣ Verify reCAPTCHA token
//     if (!captchaToken) {
//       return res.status(400).json({ error: "CAPTCHA token missing." });
//     }

//     const captchaResponse = await axios.post(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       null,
//       {
//         params: {
//           secret: "6LeGyKkrAAAAAAB1-_tu1Mbio2UiBVjgDJUWY8Aa", // your secret key
//           response: captchaToken
//         }
//       }
//     );

//     if (!captchaResponse.data.success) {
//       return res.status(400).json({ error: "CAPTCHA verification failed." });
//     }

//     // 3️⃣ Save lead in database
//     const lead = await Lead.create({
//       name,
//       mobile,
//       email,
//       business: bussiness, // map schema placeholder to field
//       location,
//       immediately,
//       message,
//       source: "hero"
//     });

//     res.json({ ok: true, leadId: lead._id });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });


module.exports = router;
