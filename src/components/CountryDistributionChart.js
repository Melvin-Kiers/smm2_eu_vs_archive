import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Title);

const CountryDistributionChart = ({ players }) => {
  // Filter alleen spelers met PB >= 7000
  const filteredPlayers = players.filter(
    (player) => player.PB && Number(player.PB) >= 7000
  );

  // Groepeer spelers per land
  const countryCounts = filteredPlayers.reduce((acc, player) => {
    const name = player.Country_Name || "Unknown";
    acc[name] = acc[name] || { count: 0, link: player.Country_Link };
    acc[name].count += 1;
    return acc;
  }, {});

  const labels = Object.keys(countryCounts); // → bv ["Germany", "Netherlands", ...]
  const data = labels.map((name) => countryCounts[name].count);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Player amount",
        data,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF",
          "#FF9F40", "#B4E197", "#C9CBCF", "#8E44AD", "#1ABC9C",
          "#1A66BC",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right", // ← handiger bij landennamen
      },
      title: {
        display: true,
        text: `Total players with a PB of 7K or higher: ${filteredPlayers.length}`,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.parsed} players`,
        },
      },
    },
  };

  return (
    <div className="pieChart">
      <h3 className="mb-3">Player Base</h3>
      <div style={{ width: "100%", height: "300px" }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CountryDistributionChart;
