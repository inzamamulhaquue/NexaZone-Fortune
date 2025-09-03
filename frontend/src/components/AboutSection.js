// frontend/src/components/AboutSection.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AboutSection.css";

const AboutSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/about")
    axios.get("https://nexazone-fortune-backend.onrender.com/api/about")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <section className="about">
      <div className="about-inner">
        {/* Intro */}
        <div className="about-header">
          <h1 className="about-title">{data.title}</h1>
          <p className="about-intro">{data.intro}</p>
        </div>

        {/* Features & Benefits */}
        <div className="about-grid">
          <div className="about-card">
            <h2 className="about-subtitle">Features</h2>
            <ul className="checklist">
              {data.features?.slice(0,10).map((item, idx) => (
                <li key={idx}>
                  <span className="tick" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-card">
            <h2 className="about-subtitle">Benefits</h2>
            <ul className="checklist">
              {data.benefits?.slice(0,10).map((item, idx) => (
                <li key={idx}>
                  <span className="tick" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How it Works */}
        <div className="howitworks">
          <h2 className="about-subtitle">How it Works</h2>
          <p className="howitworks-intro">With just three simple steps, register your business in Dubai Free Zone.</p>

          <div className="steps">
            {data.steps?.map((s) => (
              <div className="step-card" key={s.number}>
                <div className="step-number">
                  {String(s.number).padStart(2, "0")}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{s.title}</h3>
                  <p className="step-text">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
