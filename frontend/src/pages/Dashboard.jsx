
import React, { useState } from "react";
import AgentTab from "../components/AgentTab";
import UploadCSV from "../components/UploadCSV";
import { useNavigate } from "react-router-dom";
import Distribution from "../components/Distribution";
import API from "../axios";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("agents");
 const navigate = useNavigate();
  const renderTabContent = () => {
    switch (activeTab) {
      case "agents":
        return <AgentTab />;
      case "upload":
        return <UploadCSV />;
      case "distribution":
        return <Distribution/>;
      default:
        return null;
    }
  };
  const handleLogout = async () => {
    try {
      // optional: call backend logout endpoint
      // can skip if backend doesn't handle anything

      // remove token from localStorage
      localStorage.removeItem("token");

      // redirect to login page
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error logging out");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b p-4 ">
        <h1 className="text-lg font-semibold text-gray-800">Admin Dashboard</h1>
        <button
      onClick={handleLogout}
      className="border border-gray-300 px-3 py-1.5 rounded-md text-sm flex items-center gap-1 hover:bg-gray-100"
    >
      Logout
    </button>
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-6 w-full max-w-5xl mx-auto">
        <button
          onClick={() => setActiveTab("agents")}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "agents"
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Agents
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "upload"
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Upload CSV
        </button>

        <button
          onClick={() => setActiveTab("distribution")}
          className={`flex-1 py-2 rounded-md text-sm font-medium ${
            activeTab === "distribution"
              ? "bg-white text-black shadow"
              : "text-gray-600 hover:text-black"
          }`}
        >
          Distribution
        </button>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto">{renderTabContent()}</div>
    </div>
  );
}

export default Dashboard
