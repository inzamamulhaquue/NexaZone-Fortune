import React, { useState, useEffect } from "react";

function ManageFacts() {
  const [facts, setFacts] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/facts")
      .then(res => res.json())
      .then(data => setFacts(data));
  }, []);

  const addFact = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/facts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newFact = await res.json();
    setFacts([...facts, newFact]);
    setForm({ title: "", description: "" });
  };

  const deleteFact = async (id) => {
    await fetch(`http://localhost:5000/api/facts/${id}`, { method: "DELETE" });
    setFacts(facts.filter(f => f._id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Facts</h1>
      <form onSubmit={addFact}>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit">Add Fact</button>
      </form>

      <ul>
        {facts.map(f => (
          <li key={f._id}>
            <strong>{f.title}</strong>: {f.description}
            <button onClick={() => deleteFact(f._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageFacts;
