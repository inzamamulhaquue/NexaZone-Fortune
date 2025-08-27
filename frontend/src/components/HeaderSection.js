import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/HeaderSection.css";

const HeaderSection = () => {
    const [headerData, setHeaderData] = useState(null);

    useEffect(() => {
        // axios.get("http://localhost:5000/api/header")
        axios.get("https://back1-sp50.onrender.com/api/header")
            .then(res => setHeaderData(res.data))
            .catch(err => console.error(err));
    }, []);

    if (!headerData) return null;


    const scrollToContact = (e) => {
        e.preventDefault(); // stop default anchor jump
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", "#contact"); // update URL
        }
    };

    //refersh page in logo click
    const refreshPgae = () => {
        window.location.reload();
    };

    return (
        <header className="main-header">
            <div className="logo-container">
                <h1 className="logo" onClick={refreshPgae} style={{ cursor: "pointer" } }>
                    <span className="n-letter">N</span>
                    <span className="f-letter">F</span> |
                    <span className="nexazone"> NexaZone</span>
                    <span className="fortune"> Fortune</span>
                </h1>
                <p className="tagline">Corporate Services</p>
            </div>

            <nav className="header-nav">
                {/* About Us button scrolls down instead of redirect */}
                <a href="#about" onClick={scrollToContact} className="nav-link about-btn">
                    {headerData.aboutButtonText || "About Us"}
                </a>




                {/* whatsapp button */}
                <button
                    className="whatsapp-btn"
                    onClick={() =>
                        window.open(
                            "https://wa.me/917631?text=Hello%20I%20want%20to%20know%20more!",
                            "_blank"
                        )
                    }
                >
                    WhatsApp
                </button>
            </nav>
        </header>
    );
};

export default HeaderSection;
