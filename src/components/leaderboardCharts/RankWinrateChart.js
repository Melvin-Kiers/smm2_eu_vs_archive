// components/RankWinrateChart.js
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Title,
  Legend,
  PointElement,
  LineElement
);

const RankWinrateChart = ({ players }) => {
  if (!players?.length) return <p>No player data available...</p>;

  // --- Group players by rank range ---
  const rankGroups = {
    "6000–6499": [],
    "6500–6999": [],
    "7000+": [],
  };

  players.forEach((p) => {
    const rating = p.versus_rating || 0;
    const plays = p.versus_plays || 0;
    const won = p.versus_won || 0;

    if (!plays || rating < 6000) return;

    const winrate = (won / plays) * 100;

    if (rating >= 6000 && rating < 6500) rankGroups["6000–6499"].push(winrate);
    else if (rating >= 6500 && rating < 7000)
      rankGroups["6500–6999"].push(winrate);
    else if (rating >= 7000) rankGroups["7000+"].push(winrate);
  });

  // --- Calculate averages ---
  const avg = (arr) =>
    arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;

  const averages = Object.values(rankGroups).map(avg);
  const labels = Object.keys(rankGroups);

  // --- Calculate overall average ---
  const allRates = Object.values(rankGroups).flat();
  const overallAvg = avg(allRates);

  // --- Chart data ---
  const data = {
    labels,
    datasets: [
      {
        label: "Average Winrate per Rank (%)",
        data: averages,
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderWidth: 1,
      },
      {
        label: "Overall Average",
        data: labels.map(() => overallAvg),
        type: "line",
        borderColor: "rgba(255, 206, 86, 0.9)",
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  };

  // --- Chart options ---
  const options = {
    responsive: true,
    maintainAspectRatio: false, // ✅ fill container
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Average Winrate per Rank Range",
        font: { size: 12 },
      },
      tooltip: {
        callbacks: {
          afterBody: () => `Overall Average: ${overallAvg.toFixed(2)}%`,
        },
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: { display: true, text: "Winrate (%)" },
      },
      x: {
        title: { display: true, text: "Rank Range" },
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

export default RankWinrateChart;
