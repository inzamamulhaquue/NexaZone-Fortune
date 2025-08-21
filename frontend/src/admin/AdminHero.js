import React, { useEffect, useState } from "react";
import axios from "axios";


const AdminHero = () => {
  const [form, setForm] = useState({
    backgroundImage: "",
    title: "",
    subtitle: "",
    chatButtonText: "",
    formTitle: "",
    placeholders: { name: "", mobile: "", email: "" },
    submitText: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/hero")
      .then(res => {
        // ensure placeholders exist
        const cfg = res.data || {};
        cfg.placeholders = cfg.placeholders || {};
        setForm({
          backgroundImage: cfg.backgroundImage || "",
          title: cfg.title || "",
          subtitle: cfg.subtitle || "",
          chatButtonText: cfg.chatButtonText || "",
          formTitle: cfg.formTitle || "",
          placeholders: {
            name: cfg.placeholders.name || "",
            mobile: cfg.placeholders.mobile || "",
            email: cfg.placeholders.email || ""
          },
          submitText: cfg.submitText || ""
        });
      })
      .finally(() => setLoading(false));
  }, []);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onPhChange = (e) =>
    setForm({ ...form, placeholders: { ...form.placeholders, [e.target.name]: e.target.value } });

  const save = async (e) => {
    e.preventDefault();
    await axios.put("http://localhost:5000/api/hero", form);
    alert("Hero config updated");
  };

  if (loading) return <p>Loading…</p>;

  return (
    <form onSubmit={save} style={{ display: "grid", gap: 10, maxWidth: 700 }}>
      <h2>Admin: Hero Section</h2>

      <label>Background Image URL
        <input name="backgroundImage" value={form.backgroundImage} onChange={onChange} />
      </label>

      <label>Title
        <input name="title" value={form.title} onChange={onChange} />
      </label>

      <label>Subtitle
        <input name="subtitle" value={form.subtitle} onChange={onChange} />
      </label>

      <label>Chat Button Text
        <input name="chatButtonText" value={form.chatButtonText} onChange={onChange} />
      </label>

      <label>Form Title
        <input name="formTitle" value={form.formTitle} onChange={onChange} />
      </label>

      <fieldset style={{ border: "1px solid #ddd", padding: 10 }}>
        <legend>Placeholders</legend>
        <label>Name
          <input name="name" value={form.placeholders.name} onChange={onPhChange} />
        </label>
        <label>Mobile
          <input name="mobile" value={form.placeholders.mobile} onChange={onPhChange} />
        </label>
        <label>Email
          <input name="email" value={form.placeholders.email} onChange={onPhChange} />
        </label>
      </fieldset>

      <label>Submit Button Text
        <input name="submitText" value={form.submitText} onChange={onChange} />
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default AdminHero;
