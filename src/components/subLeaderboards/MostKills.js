import React from "react";
import { useNavigate } from "react-router-dom";

const MostKills = ({ players, totalPlayers }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-3 col-md-12">
      <h3 className="leaderboard-title mb-3">Most Kills:</h3>

      {players.map((player, index) => (
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
            <div className="pb-label">Kills</div>
            <div className="pb-value">{player.versus_kills || 0}</div>
          </div>
        </div>
      ))}

      {/* Show all knop */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/other-leaderboards/most-kills")}
          className="btn btn-purple"
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
        >
          Show all ({totalPlayers})
        </button>
      </div>
    </div>
  );
};

export default MostKills;
