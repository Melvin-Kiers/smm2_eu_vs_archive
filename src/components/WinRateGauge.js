// components/WinRateGauge.js
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Tooltip);

const WinRateGauge = ({ winRate }) => {
  const percentage = parseFloat(winRate) || 0;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [
          percentage >= 40 ? "#4BC0C0" : percentage >= 30 ? "#FFC107" : "#FF6384", // groen / oranje / rood
          "#E0E0E0", // grijze rest
        ],
        borderWidth: 0,
        cutout: "70%", // maakt 't een gauge
        rotation: -90, // start boven
        circumference: 180, // halve cirkel
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 200, height: 150, position: "relative", top: "42px", }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          fontSize: "1.2rem",
          fontWeight: "bold",
        }}
      >
        {percentage.toFixed(2)}%
      </div>
      <div
        style={{
          position: "absolute",
          top: "70%",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "0.9rem",
          color: "#555",
        }}
      >
        Win Rate
      </div>
    </div>
  );
};

export default WinRateGauge;
