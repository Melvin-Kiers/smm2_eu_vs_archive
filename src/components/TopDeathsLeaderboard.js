// components/TopDeathsLeaderboard.js
import React from "react";

const TopDeathsLeaderboard = ({ players }) => {
  if (!players || players.length === 0) return <p>No player data available.</p>;

  // --- Sorteer spelers op aantal keer gedood door anderen (aflopend) ---
  const sortedPlayers = [...players]
    .filter((p) => p.versus_plays > 0)
    .sort((a, b) => (b.versus_killed_by_others || 0) - (a.versus_killed_by_others || 0))
    .slice(0, 10);

  return (
    <div className="mb-3 col-md-12">
      <h3 className="leaderboard-title">Most Killed by Others:</h3>
      {sortedPlayers.map((player, index) => (
        <div key={player.pid} className="player-row-custom">
          {/* Rank */}
          <div className="player-rank">
            <div className={`circle-number ${index < 3 ? "top-three" : ""}`}>
              {index + 1}
            </div>
          </div>

          {/* Player Info */}
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

          {/* Death Count */}
          <div className="playerPB">
            <div className="pb-label">Deaths</div>
            <div className="pb-value">{player.versus_killed_by_others || 0}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopDeathsLeaderboard;
