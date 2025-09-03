import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeroSection.css";
// import burj1 from "../images/burj1.jpg";
import burj2 from "../images/burj2.jpg";
// import ReCAPTCHA from "react-google-recaptcha";
import ChatAI from "./ChatAiSection";


const HeroSection = () => {
    const [cfg, setCfg] = useState(null);
    const [form, setForm] = useState({
        name: "", mobile: "", email: "", business: "",
        location: "",
        immediately: "", message: ""
    });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    // const [captchaToken, setCaptchaToken] = useState(null); // for CAPTCHA

    useEffect(() => {
        // axios.get("http://localhost:5000/api/hero")
        axios.get("https://nexazone-fortune-backend.onrender.com/api/hero")
            .then(res => setCfg(res.data))
            .catch(err => console.error(err));
    }, []);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const submitLead = async (e) => {
        e.preventDefault();
        if (!form.name || !form.mobile) return alert("Please enter name and mobile.");
        // if (!captchaToken) return alert("Please verify the CAPTCHA.");
        try {
            setSending(true);
            // await axios.post("http://localhost:5000/api/hero/lead", form);
            await axios.post("https://nexazone-fortune-backend.onrender.com/api/hero/lead", form)
            setSent(true);
            setForm({ name: "", mobile: "", email: "", business: "", location: "", immediately: "", message: "" });
            // setCaptchaToken(null); // reset CAPTCHA
        } catch (err) {
            console.error(err);
            alert("Failed to submit. Try again.");
        } finally {
            setSending(false);
        }
    };

    if (!cfg) return null;

    return (
        <section className="hero" style={{ backgroundImage: `url(${burj2})` }}>
            <div className="hero-overlay" />
            <div className="hero-inner">

                {/* Left: Headings */}
                <div className="hero-left">
                    <h1 className="hero-title">{cfg.title}</h1>
                    <p className="hero-subtitle">{cfg.subtitle}</p>

                    <button
                        // type="button" //update
                        className="chat-btn"
                        onClick={() => setChatOpen(true)}
                    // aria-expanded={chatOpen ? "true" : "false"} //update
                    >
                        {cfg.chatButtonText || "Chat with Us"}
                    </button>   
                </div>  

                {/* Right: Form */}
                <div className="hero-right">
                    <h3 className="form-title">{cfg.formTitle}</h3>
                    <form onSubmit={submitLead} className="lead-form">
                        <input
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder={cfg.placeholders?.name || "Name"}
                            required
                        />
                        <input
                            name="mobile"
                            value={form.mobile}
                            onChange={onChange}
                            placeholder={cfg.placeholders?.mobile || "Mobile Number"}
                            required
                        />
                        <input
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            placeholder={cfg.placeholders?.email || "Email"}
                            type="email"
                        />
                        <input name="business" value={form.business || ""} onChange={onChange} placeholder={cfg.placeholders?.bussiness || "Business Activity"} />

                        <select
                            name="location"
                            value={form.location || ""}
                            onChange={onChange}
                            required
                        >
                            <option value="">None</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Other UAE Location">Other UAE Location</option>
                        </select>


                        <select
                            name="immediately"
                            value={form.immediately || ""}
                            onChange={onChange}
                            required
                        >
                            {/* <option value="">{cfg.placeholders?.immediately || "When do you want to start?"}</option> */}
                            <option value="Immediately">Immediately</option>
                            <option value="1 month">1 month</option>
                            <option value="Within 2 months">Within 2 months</option>
                            <option value="After 2 months">After 2 months</option>
                        </select>



                        <textarea
                            name="message"
                            value={form.message}
                            onChange={onChange}
                            placeholder="Tell us briefly..."
                            rows={3}
                        />


                        {/* reCAPTCHA */}
                        {/* <ReCAPTCHA
                            sitekey="6LeGyKkrAAAAAK9z1nW_zjy8Jt_bYgL_5rMRUKQB"
                            onChange={(token) => setCaptchaToken(token)}
                        /> */}

                        <button type="submit" disabled={sending}>
                            {sending ? "Sending..." : (cfg.submitText || "SUBMIT")}
                        </button>

                        {sent && <div className="form-success">Thanks! We’ll contact you shortly.</div>}
                    </form>
                </div>
            </div>
            {/* Unified Chat Window */}
            <ChatAI open={chatOpen} onClose={() => setChatOpen(false)} />
        </section>
    );
};

export default HeroSection;
