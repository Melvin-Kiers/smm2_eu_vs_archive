import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PlayerInfoBox from "./PlayerInfoBox";
import MatchesStatsBox from "./MatchesStatsBox";
import ScoreBadgeBox from "./ScoreBadgeBox";
import StreakInfoBox from "./StreakInfoBox";
import MatchesStatsChart from "./MatchesStatsChart";
import KillsStatsBox from "./KillsStatsBox";
import VersusRankName from "./VersusRankName";
import RecentPerformance from "./RecentPerformance";
import WinRateGauge from "./WinRateGauge";
import MedalBox from "./MedalBox";

const PlayerPage = () => {
  const { makerId } = useParams();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://tgrcode.com/mm2/user_info/${makerId}?noCaching=1}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch player info");
        return res.json();
      })
      .then((data) => {
        setPlayerInfo(data);
      })
      .catch((err) => setErrorInfo(err.message))
      .finally(() => setLoading(false));
  }, [makerId]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <img src="/LoadingMario.gif" alt="Loading..." style={{ width: "400px" }} />
      </div>
    );
  }

  if (errorInfo) {
    return <div className="alert alert-danger">{errorInfo}</div>;
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Player Info: {makerId}</h2>
        <Link to="/" className="btn btn-secondary">
          ⬅ Back to Leaderboard
        </Link>
      </div>

      {playerInfo && (
        <div className="row g-3 mt-2">
          <div className="col-12 col-lg-6">
            <PlayerInfoBox userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-6">
            <ScoreBadgeBox userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-4">
            <MatchesStatsBox userInfo={playerInfo} />
            <div className="d-flex justify-content-center mt-3">
              <WinRateGauge
                winRate={(playerInfo.versus_won / playerInfo.versus_plays) * 100 || 0}
              />
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <MatchesStatsChart userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-4">
            <KillsStatsBox userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-6">
            <StreakInfoBox userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-6">
            <MedalBox userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-3">
            <VersusRankName userInfo={playerInfo} />
          </div>
          <div className="col-12 col-lg-3">
            <RecentPerformance userInfo={playerInfo} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerPage;
