import React from "react";
import { useNavigate } from "react-router-dom";

const TopKDLeaderboard = ({ players, totalPlayers }) => {
  const navigate = useNavigate();

  if (!players || players.length === 0) return <p>No player data available.</p>;

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
      <h3 className="leaderboard-title mb-3">Highest Kill/Death Ratio:</h3>

      {sortedPlayers.map((player, index) => (
        <div key={player.pid} className="player-row-custom">
          <div className="player-rank">
            <div className={`circle-number ${index < 3 ? "top-three" : ""}`}>
              {index + 1}
            </div>
          </div>

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

          <div className="playerPB">
            <div className="pb-label">K/D Ratio</div>
            <div className="pb-value">{player.kdRatio.toFixed(2)}</div>
          </div>
        </div>
      ))}

      {/* Show all knop */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/other-leaderboards/top-kd")}
          className="btn btn-purple"
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
        >
          Show all ({totalPlayers})
        </button>
      </div>
    </div>
  );
};

export default TopKDLeaderboard;
