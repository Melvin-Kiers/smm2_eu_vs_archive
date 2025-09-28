import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
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
import MultiplayerStatsUnk13 from "./Unk13";
import MultiplayerStatsUnk14 from "./Unk14";

const UserPage = () => {
  const { makerId } = useParams();
  const navigate = useNavigate();
  const [playerInfo, setPlayerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayer = () => {
    setLoading(true);
    setError(null);
    fetch(`https://tgrcode.com/mm2/user_info/${makerId}?noCaching=1`, {
      cache: "no-store",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch player info, please wait a few seconds before refreshing.");
        return res.json();
      })
      .then((data) => setPlayerInfo(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPlayer();
    // eslint-disable-next-line
  }, [makerId]);

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
        backgroundColor: "#000000ff",
        overflow: "hidden",      // voorkomt scrollen
        zIndex: 9999             // boven alles
      }}
    >
      <img
        src="/LoadingMario.gif"
        alt="Loading..."
        style={{ width: "50vw", height: "50vh", objectFit: "contain" }}
      />
    </div>
  );



  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!playerInfo) return <div>No data available.</div>;

  return (
    <section className="userpage-section divider">
      <div className="userpage-container">
        <div className="container py-4">
          {/* Header row */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button className="btn btn-secondary" onClick={() => navigate("/user")}>
              ← Back
            </button>

            <h2 className="playerInfoName m-0 text-center flex-grow-1">
              User information about {playerInfo.name}
            </h2>

            <button className="btn btn-purple" onClick={fetchPlayer}>
              Refresh profile
            </button>
          </div>

          {/* Player info grid */}
          <div className="playerGrid row g-3 mb-5">
            <div className="col-12 col-lg-6">
              <div className="info-box p-3 border rounded h-100">
                <PlayerInfoBox userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="info-box p-3 border rounded h-100">
                <ScoreBadgeBox userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="info-box p-3 border rounded h-100">
                <MatchesStatsBox userInfo={playerInfo} />
                <div className="d-flex justify-content-center mt-2">
                  <WinRateGauge
                    winRate={(playerInfo.versus_won / playerInfo.versus_plays) * 100 || 0}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="MatchesStatsChart info-box p-3 border rounded h-100">
                <MatchesStatsChart userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="info-box p-3 border rounded h-100">
                <KillsStatsBox userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="info-box p-3 border rounded h-100">
                <StreakInfoBox userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="info-box p-3 border rounded h-100">
                <MedalBox userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="info-box p-3 border rounded h-100">
                <RecentPerformance userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="info-box p-3 border rounded h-100">
                <VersusRankName userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="info-box p-3 border rounded h-100">
                <MultiplayerStatsUnk13 userInfo={playerInfo} />
              </div>
            </div>
            <div className="col-12 col-lg-3">
              <div className="info-box p-3 border rounded h-100">
                <MultiplayerStatsUnk14 userInfo={playerInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;
