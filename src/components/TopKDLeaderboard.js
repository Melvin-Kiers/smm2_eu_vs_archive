// components/TopKDLeaderboard.js
import React from "react";

const TopKDLeaderboard = ({ players }) => {
  if (!players || players.length === 0) return <p>No player data available.</p>;

  // --- Bereken KD ratio (kills / deaths) ---
  const sortedPlayers = [...players]
    .filter((p) => p.versus_plays > 0)
    .map((p) => ({
      ...p,
      kdRatio:
        p.versus_killed_by_others > 0
          ? p.versus_kills / p.versus_killed_by_others
          : p.versus_kills || 0,
    }))
    .sort((a, b) => b.kdRatio - a.kdRatio)
    .slice(0, 10);

  return (
    <div className="mb-3 col-md-12">
      <strong className="leaderboard">Top 5 — Kill/Death Ratio:</strong>
      {sortedPlayers.map((player, index) => (
        <div key={player.pid} className="player-row-custom">
          {/* Rank */}
          <div className="player-rank">
            <div className={`circle-number ${index < 3 ? "top-three" : ""}`}>
              {index + 1}
            </div>
          </div>

          {/* Name & Mii */}
          <div className="playerName">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {player.mii_image && (
                <img
                  src={player.mii_image}
                  alt={player.name}
                  className="player-mii"
                  style={{ width: "64px", height: "64px", borderRadius: "50%" }}
                />
              )}
              <span>{player.name}</span>
              {player.country && (
                <img
                  src={`https://flagcdn.com/w40/${player.country.toLowerCase()}.png`}
                  alt={`Flag of ${player.country}`}
                  className="player-flag"
                />
              )}
            </div>
          </div>

          {/* KD Ratio */}
          <div className="playerPB">
            <div className="pb-label">K/D Ratio</div>
            <div className="pb-value">{player.kdRatio.toFixed(2)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopKDLeaderboard;
