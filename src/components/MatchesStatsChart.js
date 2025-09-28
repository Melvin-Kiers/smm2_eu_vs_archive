// components/MatchesStatsChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Title);

const MatchesStatsChart = ({ userInfo }) => {
  const { versus_plays, versus_won, versus_lost, versus_disconnected } = userInfo || {};
  const hasPlayed = versus_plays > 0;

  const chartData = {
    labels: ["Wins", "Losses", "Disconnects"],
    datasets: [
      {
        data: [versus_won || 0, versus_lost || 0, versus_disconnected || 0],
        backgroundColor: ["#4BC0C0", "#FF6384", "#FFC107"],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      },
      title: {
        display: true,
        text: hasPlayed ? `Total matches incl DCs: ${versus_plays + versus_disconnected}` : "No matches played"
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed} matches`
        }
      }
    }
  };

  if (!hasPlayed) {
    return (
      <p>No data</p>
    );
  }

  return (
    <div style={{ width: "100%", maxWidth: 250, height: 250 }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default MatchesStatsChart;
