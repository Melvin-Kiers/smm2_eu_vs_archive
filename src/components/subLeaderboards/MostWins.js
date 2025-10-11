import React from "react";
import { useNavigate } from "react-router-dom";

const MostWins = ({ players, totalPlayers }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-3 col-md-12">
      <div className="intro-more_leaderboards">
        <h3 className="leaderboard-title mb-3">Most Wins:</h3>
        <p className="white">Winning this much takes time, patience, and persistence. These players have collected a huge number of victories across endless matches. It doesn’t always mean they’re unbeatable — but they never give up.
          Each win adds another step on their long competitive journey. Dedication like this deserves respect on any leaderboard.</p>
      </div>

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
            <div className="pb-label">Wins</div>
            <div className="pb-value">{player.versus_won || 0}</div>
          </div>
        </div>
      ))}

      {/* Show all knop */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <button
          onClick={() => navigate("/other-leaderboards/most-wins")}
          className="btn btn-purple"
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
        >
          Show all ({totalPlayers})
        </button>
      </div>
    </div>
  );
};

export default MostWins;
