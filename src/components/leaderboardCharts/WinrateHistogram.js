// components/WinrateHistogram20to60.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Title);

const WinrateHistogram20to60 = ({ players }) => {
  if (!players?.length) return <p>No player data available.</p>;

  // Bereken winrates en filter tussen 20% en 60%
  const winrates = players
    .map((p) => (p.versus_plays ? (p.versus_won / p.versus_plays) * 100 : 0))
    .filter((w) => w >= 20 && w <= 60);

  // 2%-bins: 20–22, 22–24, ..., 58–60
  const binCount = 20;
  const bins = Array(binCount).fill(0);
  winrates.forEach((w) => {
    const index = Math.min(Math.floor((w - 20) / 2), binCount - 1);
    bins[index]++;
  });

  // Labels genereren
  const labels = Array.from({ length: binCount }, (_, i) => {
    const start = 20 + i * 2;
    const end = start + 2;
    return `${start}–${end}%`;
  });

  // Kleur per bin op basis van middenwaarde van de bin
  const getColorForBin = (binIndex) => {
    const midValue = 20 + binIndex * 2 + 1; // midden van bin
    if (midValue < 30) return "rgba(255, 99, 132, 0.7)"; // rood
    if (midValue < 40) return "rgba(255, 206, 86, 0.7)"; // geel
    return "rgba(75, 192, 75, 0.7)"; // groen
  };

  const colors = bins.map((_, i) => getColorForBin(i));

  const data = {
    labels,
    datasets: [
      {
        label: "Players",
        data: bins,
        backgroundColor: colors,
        borderColor: colors.map((c) => c.replace("0.7", "1")),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Winrate Distribution (20–60%)",
        font: {
          size: 12
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Number of Players" },
      },
      x: {
        title: { display: true, text: "Winrate (%)" },
      },
    },
  };

  // --- Container styling ---
  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        backgroundColor: "#fff", // white background
        borderRadius: "8px",
        padding: "10px",
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default WinrateHistogram20to60;
