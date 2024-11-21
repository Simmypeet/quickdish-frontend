
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useMerchant from "../../hooks/useMerchant";


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const RevenueCardWithGraph = () => {
  const axiosPrivate = useAxiosPrivate();
    const { merchant } = useMerchant();
  const [selectedTab, setSelectedTab] = useState("monthly");
  const [graphData, setGraphData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });
  const [currentDayRevenue, setCurrentDayRevenue] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  const tabs = ["daily", "weekly", "monthly"];

  const labels = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    monthly: ["Jan", "Feb", "Mar", "Apr","May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"],
  };

  const fetchData = async () => {
    try {
      const restaurant_id = merchant.restaurant_id; // Replace with dynamic restaurant_id if needed
      const response = await axiosPrivate.get(`orders/?restaurant_id=${restaurant_id}&status=SETTLED`);
      const orders = response.data;

      // Process data into daily, weekly, and monthly intervals
      const groupedData = processOrderData(orders);
      setGraphData(groupedData);

      // Calculate current day revenue
      const today = new Date();
      const todayRevenue = calculateCurrentDayRevenue(orders, today);
      setCurrentDayRevenue(todayRevenue);

      // Format the current date
      const formattedDate = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      setCurrentDate(formattedDate);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const processOrderData = (orders) => {
    const dailyRevenue = Array(7).fill(0); // Assuming 7 days for simplicity
    const weeklyRevenue = Array(4).fill(0); // Assuming 4 weeks in a month
    const monthlyRevenue = Array(12).fill(0); // 12 months

    orders.forEach((order) => {
      const settledDate = new Date(order.status.settled_at * 1000); // Convert timestamp to JS Date
      const pricePaid = parseFloat(order.price_paid);

      if (isNaN(pricePaid)) {
        console.error(`Invalid price paid: ${order.price_paid}`);
        return; // Skip invalid price
      }

      // Group by daily (Day of the week: 0 = Sunday, 6 = Saturday)
      const dayOfWeek = settledDate.getDay();
      dailyRevenue[dayOfWeek] += pricePaid;

      // Group by weekly (Week number in the current month)
      const weekOfMonth = Math.floor((settledDate.getDate() - 1) / 7); // Zero-indexed week
      weeklyRevenue[weekOfMonth] += pricePaid;

      // Group by monthly (Month: 0 = January, 11 = December)
      const month = settledDate.getMonth();
      monthlyRevenue[month] += pricePaid; // Accumulate revenue
    });

    return {
      daily: dailyRevenue,
      weekly: weeklyRevenue,
      monthly: monthlyRevenue,
    };
  };

  const calculateCurrentDayRevenue = (orders, today) => {
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    return orders
      .filter((order) => {
        const settledDate = new Date(order.status.settled_at * 1000);
        return settledDate >= startOfDay && settledDate <= endOfDay;
      })
      .reduce((total, order) => total + parseFloat(order.price_paid), 0);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="w-full p-6 mx-auto bg-white rounded-lg orange-shadow">
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
          {selectedTab === "daily" ? `${currentDayRevenue.toFixed(2)}฿` : graphData[selectedTab]?.reduce((a, b) => a + b, 0).toFixed(2) + "฿"}
        </p>
        {selectedTab === "daily" && <p className="text-sm text-gray-600">{currentDate}</p>}
        <p className="text-sm text-gray-600">Total Revenues ({selectedTab})</p>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RevenueCardWithGraph;


