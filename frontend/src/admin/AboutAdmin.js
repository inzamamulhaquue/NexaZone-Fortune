// frontend/src/admin/AboutAdmin.js
import React, { useEffect, useState } from "react";
import axios from "axios";


const linebreaks = arr => (arr || []).join("\n");
const toArray = str =>
  (str || "")
    .split("\n")
    .map(s => s.trim())
    .filter(Boolean);

const AboutAdmin = () => {
  const [form, setForm] = useState({
    title: "",
    intro: "",
    features: "",
    benefits: "",
    steps: [
      { number: 1, title: "", text: "" },
      { number: 2, title: "", text: "" },
      { number: 3, title: "", text: "" }
    ]
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/about").then(res => {
      const d = res.data;
      setForm({
        title: d.title || "",
        intro: d.intro || "",
        features: linebreaks(d.features),
        benefits: linebreaks(d.benefits),
        steps:
          d.steps?.length
            ? d.steps.map(s => ({ number: s.number, title: s.title, text: s.text }))
            : form.steps
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStep = (idx, key, value) => {
    setForm(prev => {
      const copy = { ...prev };
      const steps = [...copy.steps];
      steps[idx] = { ...steps[idx], [key]: value };
      copy.steps = steps;
      return copy;
    });
  };

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        intro: form.intro,
        features: toArray(form.features).slice(0, 10),
        benefits: toArray(form.benefits).slice(0, 10),
        steps: form.steps.map(s => ({
          number: Number(s.number) || 0,
          title: s.title,
          text: s.text
        }))
      };
      await axios.put("http://localhost:5000/api/about", payload);
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 16 }}>
      <h2>About Section Admin</h2>
      <form onSubmit={save} style={{ display: "grid", gap: 12 }}>
        <label>
          Title
          <input
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Intro
          <textarea
            rows={4}
            value={form.intro}
            onChange={e => setForm({ ...form, intro: e.target.value })}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Features (max 10 — one per line)
          <textarea
            rows={8}
            value={form.features}
            onChange={e => setForm({ ...form, features: e.target.value })}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Benefits (max 10 — one per line)
          <textarea
            rows={8}
            value={form.benefits}
            onChange={e => setForm({ ...form, benefits: e.target.value })}
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <h3>How it Works — Steps</h3>
        {form.steps.map((s, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: 12,
              display: "grid",
              gap: 8
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <label style={{ flex: "0 0 120px" }}>
                Step Number
                <input
                  type="number"
                  value={s.number}
                  onChange={e => updateStep(idx, "number", e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
              <label style={{ flex: 1 }}>
                Title
                <input
                  value={s.title}
                  onChange={e => updateStep(idx, "title", e.target.value)}
                  style={{ width: "100%", padding: 8 }}
                />
              </label>
            </div>
            <label>
              Description
              <textarea
                rows={3}
                value={s.text}
                onChange={e => updateStep(idx, "text", e.target.value)}
                style={{ width: "100%", padding: 8 }}
              />
            </label>
          </div>
        ))}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "10px 16px",
            border: "none",
            borderRadius: 8,
            background: "#16a34a",
            color: "#fff",
            fontWeight: 700,
            cursor: "pointer",
            justifySelf: "start"
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default AboutAdmin;
