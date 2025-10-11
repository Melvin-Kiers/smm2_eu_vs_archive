// components/WinrateVsPlaysChart.js
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  LineElement,
} from "chart.js";

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, LineElement);

const WinrateVsPlaysChart = ({ players }) => {
  // --- Prepare player data ---
  const playerData = players
    .filter((p) => p.versus_plays > 0)
    .map((p) => ({
      x: p.versus_plays,
      y: (p.versus_won / p.versus_plays) * 100,
      name: p.name,
    }));

  const n = playerData.length;
  if (n === 0) return <p>No data available.</p>;

  // --- Regression line ---
  const sumX = playerData.reduce((sum, p) => sum + p.x, 0);
  const sumY = playerData.reduce((sum, p) => sum + p.y, 0);
  const sumXY = playerData.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = playerData.reduce((sum, p) => sum + p.x * p.x, 0);
  const sumY2 = playerData.reduce((sum, p) => sum + p.y * p.y, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // --- Correlation coefficient (r) ---
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY)
  );
  const correlation = numerator / denominator;

  // --- Regression line points ---
  const minX = Math.min(...playerData.map((p) => p.x));
  const maxX = Math.max(...playerData.map((p) => p.x));
  const regressionLine = [
    { x: minX, y: slope * minX + intercept },
    { x: maxX, y: slope * maxX + intercept },
  ];

  // --- Color by winrate ---
  const getColorForWinrate = (winrate) => {
    if (winrate < 30) return "rgba(255, 99, 132, 0.8)"; // red
    if (winrate < 40) return "rgba(255, 206, 86, 0.9)"; // yellow
    return "rgba(75, 192, 75, 0.8)"; // green
  };

  const data = {
    datasets: [
      {
        label: "Players",
        data: playerData,
        backgroundColor: playerData.map((p) => getColorForWinrate(p.y)),
        pointRadius: 4,
      },
      {
        label: "Average trend",
        data: regressionLine,
        type: "line",
        borderColor: "rgba(54, 162, 235, 0.8)",
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ fill container instead of preserving aspect ratio
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Winrate vs Plays — average trend (r = ${correlation.toFixed(2)})`,
        font: { size: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.label === "Average trend") return null;
            const { x, y, name } = context.raw;
            return `${name}: ${y.toFixed(1)}% winrate across ${x} matches`;
          },
        },
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Number of Versus Matches" },
        beginAtZero: true,
      },
      y: {
        title: { display: true, text: "Winrate (%)" },
        min: 0,
        max: 100,
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#fff", // ✅ white background
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <Scatter data={data} options={options} />
    </div>
  );
};

export default WinrateVsPlaysChart;
