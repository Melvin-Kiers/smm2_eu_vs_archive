import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pids from "./pids";

const MostPlaysFull = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const url = `https://tgrcode.com/mm2/user_info_multiple/${pids.join(",")}`;
        const res = await fetch(url);
        const text = await res.text();
        const data = JSON.parse(text, (key, value) =>
          key === "pid" ? String(value) : value
        );
        setUsers(
          [...data.users].sort((a, b) => (b.versus_plays || 0) - (a.versus_plays || 0))
        );
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  // 🔹 Laadscherm met GIF
  if (loading)
    return (
      <div
        style={{
          position: "fixed",       // maakt het scherm vast
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000ff", // zwart
          overflow: "hidden",
          zIndex: 9999,            // boven alles
        }}
      >
        <img
          src="/LoadingMario.gif"
          alt="Loading..."
          style={{ width: "50vw", height: "50vh", objectFit: "contain" }}
        />
      </div>
    );

  if (!users.length)
    return <div className="text-center py-4">No players found.</div>;

  return (
    <div className="container py-4">
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="leaderboard-title mb-0">Most Plays – All Players</h2>
        <button
          onClick={() => navigate("/other-leaderboards")}
          className="btn btn-secondary"
        >
          ← Terug
        </button>
      </div>

      {users.map((player, index) => (
        <div key={player.pid} className="player-row-custom mb-2">
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

export default MostPlaysFull;
