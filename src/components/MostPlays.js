import React from "react";

const MostPlays = ({ players }) => {
  return (
    <div className="mb-3 col-md-12">
      <strong className="leaderboard">Most Plays:</strong>
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
            <div className="pb-label">Plays</div>
            <div className="pb-value">{player.versus_plays || 0}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MostPlays;
