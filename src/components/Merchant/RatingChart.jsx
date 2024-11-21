import React, { useState, useEffect } from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getRestaurantReviewByIds } from "../../api/restaurantApi";
import useMerchant from "../../hooks/useMerchant";

const RatingChart = () => {
  const { merchant } = useMerchant();
  const colors = ["#e74c3c", "#f39c12", "#f1c40f", "#2ecc71", "#27ae60"];
  const maxScore = 5;

  const [overallRate, setOverallRate] = useState({
    rate: null,
    tastiness: null,
    hygiene: null,
    quickness: null,
  });
  const [loading, setLoading] = useState(true);

  const getRate = async (restaurantId) => {
    try {
      console.log("Fetching data for restaurant ID:", restaurantId);
      const response = await getRestaurantReviewByIds(restaurantId);
      console.log("API response:", response);
      setOverallRate({
        rate: response.overall_rate ?? 0,
        tastiness: response.avgTastiness ?? 0,
        hygiene: response.avgHygiene ?? 0,
        quickness: response.avgQuickness ?? 0,
      });
    } catch (error) {
      console.error("Error fetching rating data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (merchant.restaurant_id) {
      getRate(merchant.restaurant_id);
    } else {
      console.error("No restaurant ID available.");
      setLoading(false);
    }
  }, [merchant.restaurant_id]);

  if (loading) {
    return (
      <div className="bg-white w-96 h-96 rounded-md p-5 flex justify-center items-center">
        <div>Loading...</div>
      </div>
    );
  }

  const percentage = (overallRate.rate / maxScore) * 100;

  const getColor = (score) => {
    if (score <= 1) return colors[0]; // Very Poor
    if (score <= 2) return colors[1]; // Poor
    if (score <= 3) return colors[2]; // Fair
    if (score <= 4) return colors[3]; // Good
    return colors[4]; // Excellent
  };

  return (
    <div className="bg-white w-96 h-96 rounded-md p-5 orange-shadow">
      <div style={{ width: 200, height: 200, margin: "auto" }}>
        <CircularProgressbarWithChildren
          value={percentage}
          styles={buildStyles({
            rotation: 0.75,
            strokeLinecap: "round",
            textColor: "#000",
            pathColor: getColor(overallRate.rate),
            trailColor: "#ddd",
          })}
        >
          <div style={{ fontSize: "30px", fontWeight: "bold" }}>
            {overallRate.rate} / {maxScore}
          </div>
          <div style={{ fontSize: "12px", color: "#555" }}>Customer Rating</div>
        </CircularProgressbarWithChildren>
        <div className="mt-5 flex flex-col space-y-5">
          <h2>Hygiene: {overallRate.hygiene}</h2>
          <h2>Quickness: {overallRate.quickness}</h2>
          <h2>Tastiness: {overallRate.tastiness}</h2>
        </div>
      </div>
    </div>
  );
};

export default RatingChart;
