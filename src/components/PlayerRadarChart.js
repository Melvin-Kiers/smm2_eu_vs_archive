// components/PlayerRadarChart.js
import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Title
);

const PlayerRadarChart = ({ players }) => {
  if (!players?.length) return <p>No player data available.</p>;

  // --- Take top 5 players by winrate ---
  const topPlayers = [...players]
    .filter((p) => p.versus_plays > 0)
    .map((p) => ({
      ...p,
      winrate: (p.versus_won / p.versus_plays) * 100,
      kdRatio:
        p.versus_killed_by_others > 0
          ? p.versus_kills / p.versus_killed_by_others
          : p.versus_kills,
    }))
    .sort((a, b) => b.winrate - a.winrate)
    .slice(0, 5);

  // --- Normalize values so they fit within 0–100 scale ---
  const maxRating = Math.max(...topPlayers.map((p) => p.versus_rating || 0), 1);
  const maxKills = Math.max(...topPlayers.map((p) => p.versus_kills || 0), 1);
  const maxDeaths = Math.max(
    ...topPlayers.map((p) => p.versus_killed_by_others || 0),
    1
  );

  const data = {
    labels: ["Winrate", "Kills", "Deaths (inverse)", "Rating"],
    datasets: topPlayers.map((p, index) => ({
      label: p.name,
      data: [
        p.winrate, // Winrate as-is
        (p.versus_kills / maxKills) * 100, // Normalized kills
        (1 - (p.versus_killed_by_others / maxDeaths)) * 100, // Inverted deaths
        ((p.versus_rating || 0) / maxRating) * 100, // Normalized rating
      ],
      backgroundColor: `hsla(${index * 60}, 70%, 60%, 0.2)`,
      borderColor: `hsla(${index * 60}, 70%, 50%, 0.9)`,
      borderWidth: 2,
      pointRadius: 3,
      pointHoverRadius: 5,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: "top" },
      title: {
        display: true,
        text: "Top 5 Players — Overall Performance Radar",
        font: { size: 16 },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { stepSize: 20 },
        pointLabels: { font: { size: 12 } },
      },
    },
  };

  // --- Styled container ---
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#fff",
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <Radar data={data} options={options} />
    </div>
  );
};

export default PlayerRadarChart;
