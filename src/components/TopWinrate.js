import React from "react";

const TopWinrate = ({ players }) => {
  if (!players?.length) return <p>No player data available.</p>;

  // Bereken winrate en sorteer aflopend
  const sortedPlayers = [...players]
    .filter((p) => p.versus_plays > 0)
    .map((p) => ({
      ...p,
      winrate: (p.versus_won / p.versus_plays) * 100,
    }))
    .sort((a, b) => b.winrate - a.winrate)
    .slice(0, 10); // Top 5 spelers

  return (
    <div className="mb-3 col-md-12">
      <h3 className="leaderboard-title">Top Winrates:</h3>
      {sortedPlayers.map((player, index) => (
        <div key={player.pid} className="player-row-custom">
          {/* Rank nummer */}
          <div className="player-rank">
            <div className={`circle-number ${index < 3 ? "top-three" : ""}`}>
              {index + 1}
            </div>
          </div>

          {/* Naam, Mii en vlag */}
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

          {/* Winrate */}
          <div className="playerPB">
            <div className="pb-label">Winrate</div>
            <div className="pb-value">{player.winrate.toFixed(2)}%</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopWinrate;
