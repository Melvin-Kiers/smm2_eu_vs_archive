// components/KillDeathScatter.js
import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
} from "chart.js";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);


ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale);

const KillDeathScatter = ({ players }) => {
  if (!players?.length) return <p>No player data available.</p>;

  const data = {
    datasets: players.map((p) => ({
      label: p.name,
      data: [
        {
          x: p.versus_kills || 0,
          y: p.versus_killed_by_others || 0,
          r: Math.max(5, (p.versus_plays || 0) / 1000),
        },
      ],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // fill container
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => {
            const player = players[context.datasetIndex];
            const { raw } = context;
            return `Name: ${player.name}, Kills: ${raw.x}, Deaths: ${raw.y}, Plays: ${player.versus_plays}`;
          },
        },
      },
      title: {
        display: true,
        text: "Kills vs Deaths Scatter",
        font: { size: 12 },
      },
    },
    scales: {
      x: { title: { display: true, text: "Kills" }, beginAtZero: true },
      y: { title: { display: true, text: "Deaths" }, beginAtZero: true },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#fff", // white background
        borderRadius: "12px",
        padding: "10px",
      }}
    >
      <Scatter data={data} options={options} />
    </div>
  );
};

export default KillDeathScatter;
