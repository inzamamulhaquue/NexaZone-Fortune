import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Contact.css";
import { FaEnvelope, FaPhone, FaWhatsapp, FaArrowUp  } from "react-icons/fa";

const ContactSection = () => {
  const [data, setData] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);


  useEffect(() => {
    axios.get("http://localhost:5000/api/contact")
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  }, []);

   // Show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowTopBtn(true);
      else setShowTopBtn(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!data) return null;



  // WhatsApp link using first phone number
  const whatsappNumber = data.phones[0]?.replace(/\D/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20I%20want%20to%20know%20more!`;



  return (
    //add id="contact" so HeaderSection can scroll here
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <h2>{data.heading}</h2>

        {/* Contact buttons */}
        <div className="contact-buttons">
          {/* Call Button */}
          <a href={`tel:${data.phones[0]}`} className="contact-btn call-btn">
            <FaPhone className="btn-icon" /> {data.phones[0]}
          </a>

          {/* Email Button */}
          <a href={`mailto:${data.email}`} className="contact-btn email-btn">
            <FaEnvelope className="btn-icon" /> {data.email}
          </a>

          {/* WhatsApp Button */}
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="contact-btn whatsapp-btn">
            <FaWhatsapp className="btn-icon" /> WhatsApp
          </a>
        </div>


        {/* location */}
        <div className="contact-locations">
          {data.locations?.map((loc, idx) => (
            <div key={idx} className="location-box">
              <h3>{loc.city}</h3>
              <p>{loc.address}</p>
            </div>
          ))}
        </div>
      </div>
      {showTopBtn && (
        <button className="scroll-top-btn" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </section>
  );
};

export default ContactSection;