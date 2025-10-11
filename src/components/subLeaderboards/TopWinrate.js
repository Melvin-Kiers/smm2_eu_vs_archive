import React from "react";
import { useNavigate } from "react-router-dom";

const TopWinrate = ({ players, totalPlayers }) => {
  const navigate = useNavigate();

  if (!players?.length) return <p>No player data available.</p>;

  const sortedPlayers = [...players]
    .filter((p) => p.versus_plays > 0)
    .map((p) => ({ ...p, winrate: (p.versus_won / p.versus_plays) * 100 }))
    .sort((a, b) => b.winrate - a.winrate)
    .slice(0, 10);

  return (
    <div className="mb-3 col-md-12">
      <div className="intro-more_leaderboards">
        <h3 className="leaderboard-title mb-3">Top Winrates:</h3>
        <p className="white">Skill meets consistency here. These players don’t just play often — they win efficiently. Every match is calculated, every move intentional.
          A high win rate means they turn opportunities into results. Quality over quantity — that’s what sets them apart.</p>
      </div>

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
            <div className="pb-label">Winrate</div>
            <div className="pb-value">{player.winrate.toFixed(2)}%</div>
          </div>
        </div>
      ))}

      {/* Show all knop */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
        <button
          onClick={() => navigate("/other-leaderboards/top-winrate")}
          className="btn btn-purple"
          style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem" }}
        >
          Show all ({totalPlayers})
        </button>
      </div>
    </div>
  );
};

export default TopWinrate;
