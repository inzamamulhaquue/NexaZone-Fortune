import "../styles/TopBar.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const TopBar = () => {
  const [topBarData, setTopBarData] = useState(null);

  // fetch topbar data from backend
  useEffect(() => {
    // fetch("http://localhost:5000/api/topbar")
      fetch("https://back1-sp50.onrender.com");
      .then(response => response.json())
      .then(data => setTopBarData(data))
      .catch(error => console.error("Error fetching topbar data:", error));
  }, []);

  if (!topBarData) {
    return null; // or loader until data is fetched
  }

  return (
    <div className="top-bar">
      <div className="left"> ⏰ Open Hours: {topBarData.openHours}
      </div>

     

      {/* phone number */}
       <div className="center">
        📞 {topBarData.phoneNumbers?.map((phone, i) => (
          <a key={i} href={`tel:${phone}`} className="topbar-link">
            <FaPhone style={{ marginRight: "5px",  color: "white"}} />
            {phone}
          </a>
        ))}
      </div>


         {/* Email clickable */}
      <div className="center">
        <a href={`mailto:${topBarData.email}`} className="topbar-link">
          <FaEnvelope style={{ marginRight: "5px" }} />
          {topBarData.email}
        </a>
      </div>

    
      <div className="right">
        <a href={topBarData.socialLinks.facebook} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faFacebookF} />
        </a>
        <a href={topBarData.socialLinks.instagram} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href={topBarData.socialLinks.linkedin} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faLinkedinIn} />
        </a>
      </div>
    </div>
  );
};

export default TopBar;
