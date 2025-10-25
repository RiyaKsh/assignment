import React, { useState, useEffect } from "react";
import API from "../axios";

const AgentTab = () => {
  const [agents, setAgents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Fetch agents on mount
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const { data } = await API.get("/agents"); // GET /api/agents
        setAgents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAgents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddAgent = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const { data } = await API.post("/agents", form); // POST /api/agents
      setAgents((prev) => [...prev, data]); // Add newly created agent
      setForm({ name: "", email: "", mobile: "", password: "" });
      setMessage("Agent added successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error adding agent");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-sm font-semibold text-gray-800 mb-4">Add New Agent</h2>

      {message && (
        <p className={`mb-4 text-sm ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleAddAgent} className="grid grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Agent name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-200 rounded-md bg-gray-50 text-sm px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="agent@example.com"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-200 rounded-md bg-gray-50 text-sm px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none"
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="+1 234 567 8900"
          value={form.mobile}
          onChange={handleChange}
          className="border border-gray-200 rounded-md bg-gray-50 text-sm px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-200 rounded-md bg-gray-50 text-sm px-3 py-2 focus:ring-1 focus:ring-gray-400 outline-none"
          required
        />
        <button
          type="submit"
          className="col-span-2 bg-black text-white text-sm py-2 rounded-md hover:bg-gray-900 transition"
        >
          Add Agent
        </button>
      </form>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          Agent List ({agents.length})
        </h3>
        {agents.length === 0 ? (
          <p className="text-sm text-gray-500">No agents added yet</p>
        ) : (
          <ul className="space-y-2">
            {agents.map((a) => (
              <li key={a._id} className="text-sm text-gray-700">
                {a.name} — {a.email}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AgentTab;
