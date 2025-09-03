import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WhyUsSection.css";

const WhyUsSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:5000/api/whyus")
    axios.get("https://nexazone-fortune-backend.onrender.com/api/whyus")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <section className="whyus-section">
      <div className="whyus-inner">
        <div className="whyus-header">
          <h2>{data.heading}</h2>
          <p>{data.intro}</p>
        </div>

        <div className="whyus-boxes">
          {data.boxes?.map((box, idx) => (
            <div className="whyus-box" key={idx}>
              {/* If box has Services field → render services */}
              {box.Services ? (
                <>
                  <h3>Our Services</h3>
                  <ul className="services-list">
                    {box.Services.split("\n").map((service, i) => (
                      <li key={i}>{service}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <>
                  <h3>{box.number}</h3>
                  <p>{box.title}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
