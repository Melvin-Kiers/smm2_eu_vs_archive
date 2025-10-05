import React, { useEffect, useState } from "react";
import pids from "./pids";
import PlayerInfoBox from "./PlayerInfoBox";

import SummaryBox from "./SummaryBox";
import MostWins from "./MostWins";
import MostPlays from "./MostPlays";
import MostKills from "./MostKills";
import KillDeathScatter from "./KillDeathScatter";
import WinrateChart from "./WinrateChart";
import RankWinrateChart from "./RankWinrateChart";
import WinrateVsPlaysChart from "./WinrateVsPlaysChart";
import WinrateHistogram from "./WinrateHistogram";

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

function getTop5(users, field) {
  return [...users].sort((a, b) => (b[field] || 0) - (a[field] || 0)).slice(0, 5);
}

const OtherLeaderboards = () => {
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

  if (loading) return <div className="text-center py-4">Loading summary...</div>;
  if (!users.length) return <div className="text-center py-4">No data available.</div>;

  const summary = summarizeUsers(users);
  const topWins = getTop5(users, "versus_won");
  const topPlays = getTop5(users, "versus_plays");
  const topKills = getTop5(users, "versus_kills");

  return (
    <section className="more_leaderboards">
      <div className="container">
        <h1>Alle live data</h1>
        <div className="row">
          <div className="col-md-12">
            <div className="sticky-summary">
              <SummaryBox summary={summary} />
            </div>
          </div>
          <div className="col-md-12">
            <MostWins players={topWins} />
          </div>

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

          <div className="col-md-8">
              <MostPlays players={topPlays} />
              <MostKills players={topKills} />
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
   );
};

export default OtherLeaderboards;
