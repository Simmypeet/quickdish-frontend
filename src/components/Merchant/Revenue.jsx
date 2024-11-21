import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";

// Register Chart.js components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RevenueCardWithGraph = () => {
  const [selectedTab, setSelectedTab] = useState("monthly");

  const tabs = ["daily", "weekly", "monthly"];

  const graphData = {
    daily: [50, 75, 125, 60, 95, 120, 80],
    weekly: [400, 600, 845, 700, 800, 950, 1100],
    monthly: [3000, 3250, 3468, 3300, 3400, 3600, 3700],
  };

  const labels = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  };

  const chartData = {
    labels: labels[selectedTab],
    datasets: [
      {
        label: "Revenue",
        data: graphData[selectedTab],
        borderColor: "rgba(99, 102, 241, 1)", // Purple line
        backgroundColor: "rgba(99, 102, 241, 0.2)", // Light purple fill
        fill: true,
        tension: 0.4, // Curve smoothness
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="w-full p-6 mx-auto bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <div className="flex space-x-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-4 py-2 rounded-lg ${
                selectedTab === tab
                  ? "bg-purple-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <p className="text-2xl font-bold text-gray-800">
          ${graphData[selectedTab][graphData[selectedTab].length - 1].toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">Total Revenues ({selectedTab})</p>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueCardWithGraph;
