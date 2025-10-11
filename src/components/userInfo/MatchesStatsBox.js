import React from "react";

const MatchesStatsText = ({ userInfo }) => {
  const { versus_plays, versus_won, versus_lost, versus_disconnected } = userInfo || {};

  // const hasPlayed = versus_plays > 0;
  // const winRate = hasPlayed ? ((versus_won / versus_plays) * 100).toFixed(2) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
      <div><strong>Matches Played:</strong> {versus_plays ?? 0}</div>
      <div><strong>Matches Won:</strong> {versus_won ?? 0}</div>
      <div><strong>Matches Lost:</strong> {versus_lost ?? 0}</div>
      <div><strong>Disconnects:</strong> {versus_disconnected ?? 0}</div>
      {/* <div>
        {hasPlayed
          ? `Win rate: ${winRate}%`
          : "This user has never played a game"}
      </div> */}
    </div>
  );
};

export default MatchesStatsText;

