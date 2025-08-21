import { useState, useEffect } from "react";
import axios from "axios";


const AdminHeader = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/header")
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/header", formData)
      .then(res => alert("Header updated!"))
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="logo" value={formData.logo || ""} onChange={handleChange} placeholder="Logo URL" />
      <input name="aboutButtonText" value={formData.aboutButtonText || ""} onChange={handleChange} placeholder="About Button" />
      <input name="whatsappLink" value={formData.whatsappLink || ""} onChange={handleChange} placeholder="WhatsApp Link" />
      <input name="chatLink" value={formData.chatLink || ""} onChange={handleChange} placeholder="Chat Link" />
      <input name="contactButtonText" value={formData.contactButtonText || ""} onChange={handleChange} placeholder="Contact Button" />
      <button type="submit">Update Header</button>
    </form>
  );
}

export default AdminHeader;
