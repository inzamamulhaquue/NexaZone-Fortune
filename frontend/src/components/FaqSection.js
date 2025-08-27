// frontend/src/components/FaqSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Faq.css";

const FaqSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/faqs")
    axios.get("https://back1-sp50.onrender.com/api/faqs")
      .then(res => setFaqs(res.data))
      .catch(err => console.error(err));
  }, []);

  const toggleFaq = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions (FAQ)</h2>
      <div className="faq-container">
        {faqs.map((faq, idx) => (
          <div key={idx} className="faq-item">
            <div className="faq-question" onClick={() => toggleFaq(idx)}>
              <span>Q. {faq.question}</span>
              <span className="faq-toggle">{activeIndex === idx ? "-" : "+"}</span>
            </div>
            {activeIndex === idx && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FaqSection;
