import { useState, useEffect } from "react";
import axios from "axios";

const AdminTopBar = () => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/api/topbar")
      .then(res => setFormData(res.data))
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://localhost:5000/api/topbar", formData)
      .then(res => alert("TopBar updated!"))
      .catch(err => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="openHours" value={formData.openHours || ""} onChange={handleChange} />
      <input name="email" value={formData.email || ""} onChange={handleChange} />
      {/* add phone numbers and social links inputs */}
      <button type="submit">Update TopBar</button>
    </form>
  )
}

export default AdminTopBar;
