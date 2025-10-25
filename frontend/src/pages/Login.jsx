import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import API from "../axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await API.post("auth/login", {
        email,
        password,
      });

      // Store JWT token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-gray-800 text-base font-medium mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-200 bg-gray-50 text-sm px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A0A17] text-white text-sm font-medium py-2 rounded-md hover:bg-black transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
