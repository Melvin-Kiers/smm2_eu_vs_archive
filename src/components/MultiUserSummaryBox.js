// components/MultiUserSummaryBox.js
import React, { useEffect, useState } from "react";
import PlayerInfoBox from "./PlayerInfoBox";
import pids from "./pids";

function summarizeUsers(users) {
  return {
    versusWon: users.reduce((sum, u) => sum + (u.versus_won || 0), 0),
    versusLose: users.reduce((sum, u) => sum + (u.versus_lost || 0), 0),
    versusDC: users.reduce((sum, u) => sum + (u.versus_disconnected || 0), 0),
    versusPlays: users.reduce((sum, u) => sum + (u.versus_plays || 0), 0),
    versusKills: users.reduce((sum, u) => sum + (u.versus_kills || 0), 0),
    versusKilledByOthers: users.reduce((sum, u) => sum + (u.versus_killed_by_others || 0), 0),
  };
}

function getTop3(users, field) {
  return [...users]
    .sort((a, b) => (b[field] || 0) - (a[field] || 0))
    .slice(0, 5);
}

const TopPlayerCard = ({ user, medal, valueLabel, value }) => (
  <div className="top-player-card">
    <span className="medal">{medal}</span>
    {user.mii_image && (
      <img src={user.mii_image} alt="Mii" className="mii-image" />
    )}
    <div className="info">
      <div className="name">{user.name}</div>
      {user.country && (
        <div className="country">
          <img
            src={`https://flagcdn.com/24x18/${user.country.toLowerCase()}.png`}
            alt={`${user.country} flag`}
          />
          <span>{user.country}</span>
        </div>
      )}
    </div>
    <div className="value">{value} {valueLabel}</div>
  </div>
);

const MultiUserSummaryBox = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `https://tgrcode.com/mm2/user_info_multiple/${pids.join(",")}`;
        const res = await fetch(url);
        const text = await res.text();
        const data = JSON.parse(text, (key, value) =>
          key === "pid" ? String(value) : value
        );
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching multiple users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading summary...</div>;
  }

  if (!users.length) {
    return <div className="text-center py-4">No data available.</div>;
  }

  const summary = summarizeUsers(users);

  const topWins = getTop3(users, "versus_won");
  const topPlays = getTop3(users, "versus_plays");
  const topKills = getTop3(users, "versus_kills");

  return (
    <div className="info-box p-4 border rounded mt-4 bg-black">
      <h4>📊 Community Summary</h4>
      <p><strong>Total Versus won:</strong> {summary.versusWon}</p>
      <p><strong>Total Versus loses:</strong> {summary.versusLose}</p>
      <p><strong>Total Versus plays:</strong> {summary.versusPlays}</p>
      <p><strong>Total Versus disconnects:</strong> {summary.versusDC}</p>
      <p><strong>Total Versus kills:</strong> {summary.versusKills}</p>
      <p><strong>Total Versus killed by others:</strong> {summary.versusKilledByOthers}</p>

      <hr />
      <h5>🏆 Top 5 Players</h5>

      <div className="row">
      <div className="mb-3 col-md-12">
        <strong>Most Wins:</strong>
        {topWins.map((player, index) => (
            <div
            key={player.pid}
            className="player-row-custom"
            title="Click for more info"
            // data-aos="fade-right"
            >
            <div className="player-rank">
                <div
                className={`circle-number ${index < 3 ? "top-three" : ""}`}
                >
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
      </div>

      <div className="mb-3 col-md-12">
        <strong>Most Plays:</strong>
        {topPlays.map((player, index) => (
            <div
            key={player.pid}
            className="player-row-custom"
            title="Click for more info"
            // data-aos="fade-right"
            >
            <div className="player-rank">
                <div
                className={`circle-number ${index < 3 ? "top-three" : ""}`}
                >
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
                    style={{ width: "32px", height: "32px", borderRadius: "50%" }}
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
      </div>

      <div className="mb-3">
        <strong>Most Kills:</strong>
        {topKills.map((player, index) => (
            <div
            key={player.pid}
            className="player-row-custom"
            title="Click for more info"
            // data-aos="fade-right"
            >
            <div className="player-rank">
                <div
                className={`circle-number ${index < 3 ? "top-three" : ""}`}
                >
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
                    style={{ width: "32px", height: "32px", borderRadius: "50%" }}
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
      </div>

      <hr />
      <h5>All Players</h5>
      {users.map((u) => (
        <div key={u.pid} className="mb-3">
          <PlayerInfoBox userInfo={u} />
        </div>
      ))}
    </div>
  );
};

export default MultiUserSummaryBox;
