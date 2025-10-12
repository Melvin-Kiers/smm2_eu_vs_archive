import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pids from "../../components/pids";
import IntroSubLeaderboards from "../../components/IntroSubLeaderboards";
import WinrateHistogram from "../../components/leaderboardCharts/WinrateHistogram";
import WinrateVsPlaysChart from "../../components/leaderboardCharts/WinrateVsPlaysChart";

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

  // 🔹 Laadscherm
  if (loading)
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000ff",
          zIndex: 9999,
        }}
      >
        <img
          src={process.env.PUBLIC_URL + "/LoadingMario.gif"}
          alt="Loading..."
          style={{ width: "50vw", height: "50vh", objectFit: "contain" }}
        />
      </div>
    );

  if (!users.length)
    return <div className="text-center py-4">No players found.</div>;

  return (
    <>
      {/* 🔹 SECTION 1 — Intro */}
      <section className="mostPlayed-lb bg-white divider divider-top">
        <div className="container py-4">
          <IntroSubLeaderboards
            title='Most Plays <span class="orange">Leaderboard</span>'
            text="The charts here explore the connection between the number of versus matches played and players’ win rates in Mario Maker 2 EU VS mode."
          />
          <div className="row mb-5">
            <div className="col-md-12">
              <p>The Winrate Distribution on the left provides an overview of how player win percentages are spread across the community. Most competitors cluster around a moderate winrate, typically between 35% and 50%, suggesting a balanced matchmaking environment where victories and losses are distributed fairly evenly. Only a small number of players manage to consistently win more than half of their matches, while a few struggle below the 30% mark. This distribution highlights that most players, regardless of skill level, tend to stabilize near an equilibrium point over time.</p>
              <p>The Winrate vs Plays scatter plot on the right examines whether playing more matches leads to better performance. Each dot represents one player, plotting their winrate against their total number of versus games. The blue regression line indicates the average trend, and in this dataset, the correlation coefficient (r ≈ -0.02) shows that there is no significant relationship between the number of matches played and the player’s winrate. In other words, experience alone — measured by total matches — does not guarantee improvement in competitive performance.</p>
            </div>
            <div className="col-md-4 mb-3">
              <div className="intro-data p-2">
                <WinrateHistogram players={users} />
              </div>
            </div>
            <div className="col-md-8 mb-3">
              <div className="intro-data p-2">
                <WinrateVsPlaysChart players={users} />
              </div>
            </div>
            <p>Interestingly, some high-volume players maintain only average winrates, while a few less-active players achieve impressive results with limited matches. This could suggest that personal playstyle, strategic understanding, or even matchmaking luck play a stronger role than simple repetition or grind.</p>
            <p>Another subtle takeaway is that the distribution remains stable even at higher play counts, indicating that players who play extensively tend to converge toward a consistent skill level rather than continuing to improve indefinitely.</p>
          </div>
        </div>
        <div className="section-img-top">
          <img className="yellowToad" src={process.env.PUBLIC_URL + "/images/smb1_yellowToad.png"}/>
        </div>
        <div className="section-img-bottom">
          <img className="marioFlag" src={process.env.PUBLIC_URL + "/images/data/marioFlag.png"}/>
        </div>
      </section>

      {/* 🔹 SECTION 2 — Leaderboard */}
      <section>
        <div className="container py-4">
          <div
            className="d-flex justify-content-between align-items-center mb-3"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  {player.mii_image && (
                    <img
                      src={player.mii_image}
                      alt={player.name}
                      className="player-mii"
                      style={{
                        width: "64px",
                        height: "64px",
                        borderRadius: "50%",
                      }}
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
      </section>
    </>
  );
};

export default MostPlaysFull;
