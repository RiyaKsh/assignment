import React, { useState, useEffect } from "react";
import API from "../axios";

const Distribution = () => {
  const [distributions, setDistributions] = useState([]);

  useEffect(() => {
    const fetchDistributions = async () => {
      try {
        // Fetch all agents
        const agentsRes = await API.get("/agents"); // you need a route GET /api/agents
        const agents = agentsRes.data;

        const allDistributions = [];

        // Fetch lists for each agent
        for (const agent of agents) {
          const res = await API.get(`/lists/agent/${agent._id}`);
          allDistributions.push({
            agentName: agent.name,
            agentEmail: agent.email,
            list: res.data,
          });
        }

        setDistributions(allDistributions);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDistributions();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 w-full">
      <h3 className="text-base font-medium text-gray-800 mb-4">
        Distributed Lists
      </h3>

      {distributions.length === 0 ? (
        <div className="text-gray-500 text-sm text-center py-8">
          No distributions found yet.
        </div>
      ) : (
        <div className="space-y-6">
          {distributions.map((agent, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-lg p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h4 className="text-gray-800 font-medium text-sm">
                    {agent.agentName}
                  </h4>
                  <p className="text-gray-500 text-xs">{agent.agentEmail}</p>
                </div>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                  {agent.list.length} Records
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-100 rounded-lg">
                  <thead className="bg-gray-50 text-gray-700 text-xs uppercase">
                    <tr>
                      <th className="px-3 py-2 text-left">First Name</th>
                      <th className="px-3 py-2 text-left">Phone</th>
                      <th className="px-3 py-2 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agent.list.map((item, i) => (
                      <tr
                        key={i}
                        className="border-t border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-3 py-2">{item.firstName}</td>
                        <td className="px-3 py-2">{item.phone}</td>
                        <td className="px-3 py-2">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Distribution;
