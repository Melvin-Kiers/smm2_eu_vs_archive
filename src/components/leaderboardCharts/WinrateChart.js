// components/WinrateChart.js
import React from "react";
import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend, Title);

const WinrateChart = ({ players }) => {
  if (!players?.length) return <p>No player data available...</p>;

  // --- Calculate winrate for each player ---
  const playersWithWinrate = players.map((p) => ({
    ...p,
    winrate: p.versus_plays ? (p.versus_won / p.versus_plays) * 100 : 0,
  }));

  // --- Sort players by winrate (descending) ---
  playersWithWinrate.sort((a, b) => b.winrate - a.winrate);

  // --- Color mapping based on winrate ---
  const getColorForWinrate = (winrate) => {
    if (winrate < 30) return "rgba(255, 99, 132, 0.8)"; // red
    if (winrate < 40) return "rgba(255, 206, 86, 0.9)"; // yellow
    return "rgba(75, 192, 75, 0.8)"; // green
  };

  const dataValues = playersWithWinrate.map((p) => Math.round(p.winrate));
  const playerNames = playersWithWinrate.map((p) => p.name);
  const backgroundColors = playersWithWinrate.map((p) =>
    getColorForWinrate(p.winrate)
  );

  // --- Chart data ---
  const data = {
    labels: playerNames,
    datasets: [
      {
        label: "Winrate (%)",
        data: dataValues,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  // --- Chart options ---
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ fills the container
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Winrate per Player (sorted)",
        font: { size: 12 },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${context.raw}% winrate`,
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
      },
    },
  };

  // --- Container styling ---
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <PolarArea data={data} options={options} />

      {/* Custom color legend below the chart */}
      <div
        style={{
          marginTop: "-16px",
          fontSize: "13px",
          textAlign: "center",
          color: "#555",
        }}
      >
        <span style={{ color: "rgba(255, 99, 132, 1)", marginRight: "10px" }}>
          ● Winrate &lt; 30%
        </span>
        <span style={{ color: "rgba(255, 206, 86, 1)", marginRight: "10px" }}>
          ● 30–39.9%
        </span>
        <span style={{ color: "rgba(75, 192, 75, 1)" }}>● ≥ 40%</span>
      </div>
    </div>
  );
};

export default WinrateChart;
