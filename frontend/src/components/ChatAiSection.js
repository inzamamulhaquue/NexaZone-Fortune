import React, { useState } from "react";
import axios from "axios";
import "../styles/ChatAi.css";

const emojis = ["😀", "😂", "😍", "👍", "🙏"];
const expertName = "Inzamam";

const categories = [
  "General Inquiry",
  "Booking Assistance",
  "Business Services",
  "Cost Estimation",
  "Required Documents",
  "Other Services",
];

const ChatAI = ({ open, onClose }) => {
  const [step, setStep] = useState(1); // 1: form, 2: chat
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", category: "" });
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [error, setError] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const startChat = () => {
    if (!formData.name || !formData.email || !formData.mobile) {
      setError("⚠️ Please fill all fields before continuing");
      return;
    }
    setError("");
    setStep(2);
    setMessages([
      {
        sender: "admin",
        text: `Hi ${formData.name}! How help you?.`,
      },
    ]);
  };

  const getBotReply = (message) => {
    const msg = message.toLowerCase();
    const cat = formData.category;

    if (cat === "Business Services" && (msg.includes("setup") || msg.includes("company"))) {
      return "To setup a business in UAE, you need a trade license, choose a business activity, select a location, and register with the relevant authority.";
    }
    if (cat === "Cost Estimation" && (msg.includes("cost") || msg.includes("price"))) {
      return "The cost of setting up a business in UAE depends on your business activity and location. Usually starts from AED 10,000.";
    }
    if (cat === "Required Documents" && msg.includes("documents")) {
      return "You will need your passport, visa copy, proof of address, and any trade documents required by the authority.";
    }

    return "I’m sorry, the expert is busy right now. They will connect with you shortly.";
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    // User message
    const newMsg = { sender: "user", text };
    setMessages((prev) => [...prev, newMsg]);
    setInputText("");

    // Save to backend
    try {
      // await axios.post("http://localhost:5000/api/chat/send", { ...formData, message: text });
      await axios.post("https://back1-sp50.onrender.com/api/chat/send", { ...formData, message: text });
    } catch (err) {
      console.error(err);
    }

    // If category not selected → show categories now
    if (!formData.category) {
      setShowCategories(true);
      return;
    }

    // AI reply if category already selected
    setTimeout(() => {
      const botReply = getBotReply(text);
      setMessages((prev) => [...prev, { sender: "admin", text: botReply }]);
    }, 1000);
  };

  const handleCategorySelect = (cat) => {
    setFormData({ ...formData, category: cat });
    setShowCategories(false);

    setMessages((prev) => [
      ...prev,
      { sender: "admin", text: `Great! You selected "${cat}". How can I help you today?` },
    ]);
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) sendMessage(`📎 File shared: ${file.name}`);
  };

  if (!open) return null;

  return (
    <div className="chat-box">
      <div className="chat-window">
        <div className="chat-header">
          {expertName}
          <span className="chat-time">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Step 1: User Form */}
        {step === 1 && (
          <div className="chat-form">
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInput} />
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInput} />
            <input type="text" placeholder="Mobile" name="mobile" value={formData.mobile} onChange={handleInput} />
            {error && <p className="form-alert">{error}</p>}
            <button onClick={startChat}>Continue</button>
          </div>
        )}

        {/* Step 2: Chat */}
        {step === 2 && (
          <>
            <div className="chat-body">
              {messages.map((msg, i) => (
                <p key={i} className={msg.sender === "admin" ? "admin-msg" : "user-msg"}>{msg.text}</p>
              ))}

              {/* Category selection inside chat */}
              {showCategories && !formData.category && (
                <div className="categories">
                  {categories.map((cat, i) => (
                    <button key={i} className="category-btn" onClick={() => handleCategorySelect(cat)}>
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Write a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(inputText)}
              />
              <button onClick={() => sendMessage(inputText)}>➤</button>

              <div className="emoji-container">
                <button onClick={() => setShowEmojis(!showEmojis)}>😊</button>
                {showEmojis && (
                  <div className="emoji-list">
                    {emojis.map((em, i) => (
                      <span key={i} onClick={() => sendMessage(em)}>{em}</span>
                    ))}
                  </div>
                )}
              </div>

              <label>
                📎
                <input type="file" style={{ display: "none" }} onChange={handleFile} />
              </label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatAI;
