import React, { useEffect, useState, useRef } from "react";
import pids from "./pids";
import PlayerInfoBox from "./PlayerInfoBox";
import MostWins from "./MostWins";
import MostPlays from "./MostPlays";
import MostKills from "./MostKills";
import KillDeathScatter from "./KillDeathScatter";
import WinrateChart from "./WinrateChart";
import RankWinrateChart from "./RankWinrateChart";
import WinrateVsPlaysChart from "./WinrateVsPlaysChart";
import WinrateHistogram from "./WinrateHistogram";
import TopWinrate from "./TopWinrate";
import TopKDLeaderboard from "./TopKDLeaderboard";
import TopDeathsLeaderboard from "./TopDeathsLeaderboard";
import CommunityIntro from "./CommunityIntro"
import MostDCs from "./MostDCs";
import PlayerRadarChart from "./PlayerRadarChart";


function summarizeUsers(users) {
  return {
    versusWon: users.reduce((sum, u) => sum + (u.versus_won || 0), 0),
    versusLose: users.reduce((sum, u) => sum + (u.versus_lost || 0), 0),
    versusDC: users.reduce((sum, u) => sum + (u.versus_disconnected || 0), 0),
    versusPlays: users.reduce((sum, u) => sum + (u.versus_plays || 0), 0),
    versusKills: users.reduce((sum, u) => sum + (u.versus_kills || 0), 0),
    versusKilledByOthers: users.reduce(
      (sum, u) => sum + (u.versus_killed_by_others || 0),
      0
    ),
  };
}

function getTop5(users, field) {
  return [...users]
    .sort((a, b) => (b[field] || 0) - (a[field] || 0))
    .slice(0, 10);
}

const OtherLeaderboards = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔹 Scroll functionaliteit
  const scrollLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: -sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const index = Math.round(
      sliderRef.current.scrollLeft / sliderRef.current.clientWidth
    );
    setActiveIndex(index);
  };

  const scrollToIndex = (index) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollTo({
      left: sliderRef.current.clientWidth * index,
      behavior: "smooth",
    });
  };


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

  if (loading) return <div className="text-center py-4">Loading summary...</div>;
  if (!users.length)
    return <div className="text-center py-4">No data available.</div>;

  const summary = summarizeUsers(users);
  const topWins = getTop5(users, "versus_won");
  const topPlays = getTop5(users, "versus_plays");
  const topKills = getTop5(users, "versus_kills");
  const topDCs = getTop5(users, "versus_disconnected");

  const leaderboardData = [
    <MostPlays players={topPlays} key="plays" />,
    <MostWins players={topWins} key="wins" />,
    <TopWinrate players={users} key="winrate" />,
    <MostKills players={topKills} key="kills" />,
    <TopDeathsLeaderboard players={users} key="deaths" />,
    <TopKDLeaderboard players={users} key="kd" />,
    <MostDCs players={topDCs} key="dcs" />,
  ];

  return (
    <>
    <section className="intro_more_leaderboards divider">
      <div className="container">
        <CommunityIntro summary={summary} />
      </div>
      <div className='MarioPipes'>
        <div className="GreenPipeLeft">
          <img src="/images/pipe.png" alt="GreenPipeLeft" />
        </div>
        <div className="marioWrapper">
          <div className="marioWalking">
            <img src="/images/mario_walking.gif" alt="Mario walking" />
          </div>
        </div>
        <div className="GreenPipeRight">
          <img src="/images/pipe.png" alt="GreenPipeRight" />
        </div>
      </div> 
    </section>

    <section className="more_leaderboards">
      <div className="container">
        <div className="row">
          {/* 🔹 Scrollbare leaderboard sectie */}
          <div className="leaderboard-slider-wrapper">
            {/* Navigatiepijlen */}
            <div className="leaderboard-arrows">
              <button className="arrow-btn left" onClick={scrollLeft}>
                ←
              </button>
              <button className="arrow-btn right" onClick={scrollRight}>
                →
              </button>
            </div>

            {/* Slider */}
            <div
              ref={sliderRef}
              className="leaderboard-slider"
              onScroll={handleScroll}
            >
              {leaderboardData.map((component, i) => (
                <div
                  key={i}
                  className="leaderboard-slide"
                  style={{ flex: "0 0 100%", scrollSnapAlign: "center" }}
                >
                  {component}
                </div>
              ))}
            </div>

            {/* Bullets */}
            <div className="leaderboard-bullets">
              {leaderboardData.map((_, i) => (
                <div
                  key={i}
                  className={`bullet ${i === activeIndex ? "active" : ""}`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="col-md-4 mb-3">
            <WinrateChart players={users} />
          </div>
          <div className="col-md-4 mb-3">
            <RankWinrateChart players={users} />
          </div>
          <div className="col-md-4 mb-3">
            <WinrateHistogram players={users} />
          </div>

          <div className="col-md-12 mb-3">
            <WinrateVsPlaysChart players={users} />
          </div>
          <div className="col-md-12 mb-3">
            <KillDeathScatter players={users} />
          </div>
          <div className="col-md-12">
            <PlayerRadarChart players={users} />
          </div>
        </div>

        <hr />
        <h5>All Players</h5>
        {users.map((u) => (
          <div key={u.pid} className="mb-3">
            <PlayerInfoBox userInfo={u} />
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default OtherLeaderboards;
