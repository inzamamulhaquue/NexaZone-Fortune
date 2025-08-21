import React, { useEffect, useState } from "react";
import axios from "axios";


const WhyUsAdmin = () => {
  const [form, setForm] = useState({ heading: "", intro: "", boxes: [] });

  useEffect(() => {
    axios.get("http://localhost:5000/api/whyus")
      .then(res => setForm(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e, idx, field) => {
    if (field === "boxes") {
      const newBoxes = [...form.boxes];
      newBoxes[idx][e.target.name] = e.target.value;
      setForm({ ...form, boxes: newBoxes });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const addBox = () => {
    setForm({ ...form, boxes: [...form.boxes, { number: "", title: "" }] });
  };

  const removeBox = (idx) => {
    const newBoxes = form.boxes.filter((_, i) => i !== idx);
    setForm({ ...form, boxes: newBoxes });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/whyus", form)
      .then(res => alert("Updated successfully"))
      .catch(err => console.error(err));
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>Why Us Admin</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="heading" value={form.heading} onChange={handleChange} placeholder="Heading" />
        <textarea name="intro" value={form.intro} onChange={handleChange} placeholder="Intro" rows={4} />
        {form.boxes.map((box, idx) => (
          <div key={idx}>
            <input type="text" name="number" value={box.number} onChange={(e) => handleChange(e, idx, "boxes")} placeholder="Number" />
            <input type="text" name="title" value={box.title} onChange={(e) => handleChange(e, idx, "boxes")} placeholder="Title" />
            <button type="button" onClick={() => removeBox(idx)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addBox}>Add Box</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default WhyUsAdmin;
