// import React, { useEffect, useState } from "react";
// import Papa from "papaparse";
// import CountryDistributionChart from "./CountryDistributionChart";
// import PlayerInfoBox from "./PlayerInfoBox";
// import MatchesStatsBox from "./MatchesStatsBox";
// import KillsStatsBox from "./KillsStatsBox";
// import ScoreBadgeBox from "./ScoreBadgeBox";
// import StreakInfoBox from "./StreakInfoBox";
// import MatchesStatsChart from "./MatchesStatsChart";
// import VersusRankName from "./VersusRankName";
// import RecentPerformance from "./RecentPerformance";
// import WinRateGauge from "./WinRateGauge";
// import MedalBox from "./MedalBox";

// const Leaderboard = () => {
//   const [players, setPlayers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [visibleCount, setVisibleCount] = useState(5);
//   const [selectedPlayer, setSelectedPlayer] = useState(null);
//   const [playerInfo, setPlayerInfo] = useState(null);
//   const [loadingInfo, setLoadingInfo] = useState(false);
//   const [errorInfo, setErrorInfo] = useState(null);
//   const [countryFilter, setCountryFilter] = useState(null);

//   useEffect(() => {
//     if (selectedPlayer) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [selectedPlayer]);


//   useEffect(() => {
//     const csvUrl =
//       "https://docs.google.com/spreadsheets/d/e/2PACX-1vSz_NpxGu2kWDDneye0zFrwZC5EXzva04G8MNrUvMDUOh17GU1T22b5WJdU0ig-9l18kiYkOajzCxRs/pub?output=csv";

//     fetch(csvUrl)
//       .then((res) => res.text())
//       .then((text) => {
//         const parsed = Papa.parse(text, { header: true });

//         const cleanedPlayers = parsed.data
//           .map((player) => ({
//             ...player,
//             PB: player.PB ? player.PB.trim().replace(",", ".") : "",
//             Name: player.Name ? player.Name.trim() : "",
//             Country_Link: player.Country_Link ? player.Country_Link.trim() : "",
//             Country_Name: player.Country_Name ? player.Country_Name.trim() : "",
//             Maker_ID: player.Maker_ID ? player.Maker_ID.trim() : "",
//             Highest_Winstreak: player.Highest_Winstreak && player.Highest_Winstreak.trim() !== ""
//               ? Number(player.Highest_Winstreak)
//               : "Unknown",
//             Highest_Losestreak: player.Highest_Losestreak && player.Highest_Losestreak.trim() !== ""
//               ? Number(player.Highest_Losestreak)
//               : "Unknown",
//           }))
//           .filter((player) => player.PB && !isNaN(player.PB));

//         const sortedPlayers = cleanedPlayers.sort(
//           (a, b) => Number(b.PB) - Number(a.PB)
//         );

//         setPlayers(sortedPlayers);
//       });
//   }, []);

//   const handlePlayerClick = (player) => {
//     if (!player.Maker_ID) return;

//     setSelectedPlayer(player);       // ← update player
//     setLoadingInfo(true);            // ← show loading
//     setErrorInfo(null);              // ← reset error
//     setPlayerInfo(null);             // ← reset previous data

//     // Voeg hier een unieke timestamp toe om cache te omzeilen
//     fetch(`https://tgrcode.com/mm2/user_info/${player.Maker_ID}?noCaching=1`, {
//       cache: 'no-store',
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch player info");
//         return res.json();
//       })
//       .then((data) => {
//         console.log("Fetched player info:", data);
//         setPlayerInfo(data);
//       })
//       .catch((e) => {
//         setErrorInfo(e.message);
//       })
//       .finally(() => {
//         setLoadingInfo(false);
//       });
//   };

//   const closeModal = () => {
//     setSelectedPlayer(null);
//     setPlayerInfo(null);
//     setErrorInfo(null);
//   };

//   // Alle unieke landen op naam verzamelen
//   const uniqueCountries = [...new Set(players.map((p) => p.Country_Name))].filter(Boolean);

//   const filteredPlayers = players.filter(
//     (player) =>
//       player.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       (!countryFilter || player.Country_Name === countryFilter)
//   );

//   const visiblePlayers = filteredPlayers.slice(0, visibleCount);


//   return (
//     <section className="leaderboard-section pt-5 position-relative">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             {/* <img src="/images/CWearth.png" alt="" className="CWearth"/> */}
//             {/* <img src="/images/CWmoon.png" alt="" className="CWmoon"/> */}
//             <h2 className="leaderboard-title mb-2">European PB <span>Leaderboard</span></h2>
//             <p className="leaderboard-intro mb-4">
//               Here you can view the PB leaderboard of all active and known VS players.  
//               By clicking on a player’s profile, you’ll be able to see their live statistics in real time.  
//               Most of the data shown here is retrieved via the <a href="https://tgrcode.com/mm2/docs/" target="_blank" rel="noreferrer">Super Mario Maker 2 Public API</a>, 
//               which provides up-to-date information about Super Mario Maker 2 players and their performance.
//             </p>
//             <p className="leaderboard-intro mb-4">
//               To keep the leaderboard relevant, this leaderboard also makes use of a connected Google Sheet.  
//               This sheet contains a curated list of Maker IDs, and only players included in that list will appear on the leaderboard.  
//               If your profile does not appear but you are an active VS player, please join the community Discord to request your Maker ID to be added.
//             </p>
//             <p className="leaderboard-intro mb-4">
//               Please note that data updates are dependent on the Public API.  
//               As a result, it may sometimes take a little longer before the leaderboard is refreshed with the most recent statistics.
//             </p>
//               <div className="filters-container d-flex mb-3" style={{ gap: "10px" }}>
//                 <div style={{ flex: "1" }}>
//                   <select
//                     className="form-select"
//                     value={countryFilter || ""}
//                     onChange={(e) => setCountryFilter(e.target.value || null)}
//                   >
//                     <option value="">🌍 All countries</option>
//                     {uniqueCountries.map((country, i) => (
//                       <option key={country + i} value={country}>
//                         {country}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div style={{ flex: "2" }}>
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Search players..."
//                     value={searchTerm}
//                     onChange={(e) => {
//                       setSearchTerm(e.target.value);
//                       setVisibleCount(5);
//                     }}
//                   />
//                 </div>
//               </div>
//             {visiblePlayers.length > 0 ? (
//               visiblePlayers.map((player, index) => {
//                 const actualIndex = players.findIndex((p) => p.Name === player.Name);
//                 return (
//                   <div
//                     key={player.Name + index}
//                     className="player-row-custom"
//                     onClick={() => handlePlayerClick(player)}
//                     // style={{ cursor: player.Maker_ID ? "pointer" : "default" }}
//                     title={player.Maker_ID ? "Click for more info" : ""}
//                   >
//                     <div className="player-rank">
//                       <div className={`circle-number ${actualIndex < 3 ? "top-three" : ""}`}>
//                         {actualIndex + 1}
//                       </div>
//                     </div>
//                     <div className="playerName">
//                       <div>
//                         <img
//                           src={player.Country_Link}
//                           alt={`Flag of ${player.Name}`}
//                           className="player-flag"
//                         />
//                         <span>{player.Name}</span>
//                       </div>
//                     </div>
//                     <div className="playerPB">
//                       <div className="pb-label">Versus PB</div>
//                       <div className="pb-value">{player.PB}</div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="text-center py-4">No players found.</div>
//             )}

//             <div className="d-flex justify-content-end my-3 gap-2">
//               {visibleCount >= 10 && (
//                 <button className="btn btn-secondary" onClick={() => setVisibleCount(5)}>
//                   Show less
//                 </button>
//               )}
              
//               {visibleCount < filteredPlayers.length && (
//                 <button
//                   className="btn btn-primary"
//                   onClick={() => setVisibleCount((prev) => prev + 10)}
//                 >
//                   Show more
//                 </button>
//               )}

//               {visibleCount < filteredPlayers.length && (
//                 <button
//                   className="btn btn-purple"
//                   onClick={() => setVisibleCount(filteredPlayers.length)}
//                 >
//                   Show all
//                 </button>
//               )}
//             </div>

//             {selectedPlayer && (
//               <div
//                 className="modal show d-block"
//                 tabIndex="-1"
//                 role="dialog"
//                 onClick={closeModal}
//                 style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
//               >
//                 <div className="modal-dialog modal-xl modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
//                   <div className="modal-content">
//                     <div className="modal-header">
//                       <h5 className="modal-title">
//                         Info for {selectedPlayer.Name} ({selectedPlayer.Maker_ID})
//                       </h5>
//                       <button
//                         type="button"
//                         className="btn-close"
//                         aria-label="Close"
//                         onClick={closeModal}
//                       ></button>
//                     </div>
//                     <div className="modal-body">
//                       {loadingInfo && (
//                         <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "200px" }}>
//                           <img src="/LoadingMario.gif" alt="Loading..."  style={{ width: "800px"}} />
//                         </div>
//                       )}
//                       {errorInfo && <div className="alert alert-danger">{errorInfo}</div>}
//                       {playerInfo && (
//                         <div>
//                           <div className="row g-3 mt-2">
//                             <div className="col-12 col-lg-6">
//                               <div 
//                                 className="info-box p-3 border rounded d-flex justify-content-center align-items-center" 
//                                 style={{ height: "100%" }}
//                               >
//                                 <PlayerInfoBox userInfo={playerInfo} />
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-6">
//                               <div className="info-box p-3 border rounded">
//                                 <ScoreBadgeBox userInfo={playerInfo} />
//                               </div>
//                             </div>
//                               <div className="col-12 col-lg-4">
//                                 <div 
//                                   className="info-box p-3 border rounded d-flex flex-column justify-content-between" 
//                                   style={{ height: "100%" }}
//                                 >
//                                   <MatchesStatsBox userInfo={playerInfo} />

//                                   <div className="d-flex justify-content-center" style={{ marginBottom: "-41px" }}>
//                                     <WinRateGauge
//                                       winRate={((playerInfo.versus_won / playerInfo.versus_plays) * 100) || 0}
//                                     />
//                                   </div>
//                                 </div>
//                               </div>
//                             <div className="col-12 col-lg-4"> 
//                               <div className="info-box p-3 border rounded d-flex justify-content-center align-items-center">
//                                 <MatchesStatsChart userInfo={playerInfo} /> 
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-4">
//                               <div className="info-box p-3 border rounded">
//                                 <KillsStatsBox userInfo={playerInfo} />
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-6">
//                               <div className="info-box p-3 border rounded">
//                                 <StreakInfoBox userInfo={playerInfo} />
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-6">
//                               <div className="info-box p-3 border rounded">
//                                 <MedalBox userInfo={playerInfo} />
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-3">
//                               <div className="info-box p-3 border rounded">
//                                 <strong>Highest winstreak:</strong>{" "}<br />
//                                 {selectedPlayer?.Highest_Winstreak === "Unknown"
//                                   ? "Unknown"
//                                   : `${selectedPlayer?.Highest_Winstreak} 🚀`}
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-3">
//                               <div className="info-box p-3 border rounded">
//                                 <strong>Highest Losestreak:</strong>{" "} <br />
//                                 {selectedPlayer?.Highest_Losestreak === "Unknown"
//                                   ? "Unknown"
//                                   : `${selectedPlayer?.Highest_Losestreak} 📉`}
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-3">
//                               <div className="info-box p-3 border rounded">
//                                 <VersusRankName userInfo={playerInfo} />
//                               </div>
//                             </div>
//                             <div className="col-12 col-lg-3">
//                               <div className="info-box p-3 border rounded">
//                                 <RecentPerformance userInfo={playerInfo} />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     <div className="modal-footer">
//                       <button type="button" className="btn btn-primary" onClick={() => handlePlayerClick(selectedPlayer)}>
//                         🔄 Refresh
//                       </button>
//                       <button type="button" className="btn btn-secondary" onClick={closeModal}>
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div className="countryDistribution col-lg-4">
//             <CountryDistributionChart players={players} />
//           </div>
//           <div className="countryDistribution col-lg-8">
//             <h2 className="mb-2">About the Player Base</h2>
//               <p>
//                 Our community is growing rapidly across Europe. The chart shows the distribution of players by country, with Germany and the UK leading the way. More countries are joining every season, making the scene more competitive and diverse.
//               </p>
//             {/* CTA Box */}
//             <div className="cta-box p-4 mt-4">
//               <h4 className="mb-2">🌍 Be part of the story!</h4>
//                 <p className="mb-4">
//                   Do you want to see your country grow on the leaderboard? Join the competition, submit your PBs, and represent your nation!
//                 </p>
//               <button className="cta-btn">Join the Discord!</button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="svg-wrapper">
//         <img src="/images/underGround1.png" alt="" />
//       </div>
//     </section>
//   );
// };

// export default Leaderboard;

import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import CountryDistributionChart from "./CountryDistributionChart";
// import MultiUserSummaryBox from "./MultiUserSummaryBox";
import { useNavigate } from "react-router-dom";


const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(5);
  const [countryFilter, setCountryFilter] = useState(null);
  const [userCode, setUserCode] = useState("");


  const navigate = useNavigate();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem("scrollPosition"); // eenmalig gebruiken
    }
  }, []);

  useEffect(() => {
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSz_NpxGu2kWDDneye0zFrwZC5EXzva04G8MNrUvMDUOh17GU1T22b5WJdU0ig-9l18kiYkOajzCxRs/pub?output=csv";

    fetch(csvUrl)
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, { header: true });

        const cleanedPlayers = parsed.data
          .map((player) => ({
            ...player,
            PB: player.PB ? player.PB.trim().replace(",", ".") : "",
            Name: player.Name ? player.Name.trim() : "",
            Country_Link: player.Country_Link ? player.Country_Link.trim() : "",
            Country_Name: player.Country_Name ? player.Country_Name.trim() : "",
            Maker_ID: player.Maker_ID ? player.Maker_ID.trim() : "",
            Highest_Winstreak:
              player.Highest_Winstreak &&
              player.Highest_Winstreak.trim() !== ""
                ? Number(player.Highest_Winstreak)
                : "Unknown",
            Highest_Losestreak:
              player.Highest_Losestreak &&
              player.Highest_Losestreak.trim() !== ""
                ? Number(player.Highest_Losestreak)
                : "Unknown",
          }))
          .filter((player) => player.PB && !isNaN(player.PB));

        const sortedPlayers = cleanedPlayers.sort(
          (a, b) => Number(b.PB) - Number(a.PB)
        );

        setPlayers(sortedPlayers);
      });
  }, []);

  const handlePlayerClick = (player) => {
    if (!player.Maker_ID) return;

    // sla huidige scrollpositie op
    sessionStorage.setItem("scrollPosition", window.scrollY);

    navigate(`/user/${player.Maker_ID}`);
  };

  // Alle unieke landen op naam verzamelen
  const uniqueCountries = [
    ...new Set(players.map((p) => p.Country_Name)),
  ].filter(Boolean);

  const filteredPlayers = players.filter(
    (player) =>
      player.Name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!countryFilter || player.Country_Name === countryFilter)
  );

  const visiblePlayers = filteredPlayers.slice(0, visibleCount);

  return (
    <section className="leaderboard-section py-5 position-relative divider" id="leaderboard-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="leaderboard-title mb-2">
              European PB <span>Leaderboard</span>
            </h2>
            <p className="leaderboard-intro mb-4">
              Here you can view the PB leaderboard of all active and known VS
              players. By clicking on a player’s profile, you’ll be able to see
              their live statistics in real time. Most of the data shown here is
              retrieved via the{" "}
              <a
                href="https://tgrcode.com/mm2/docs/"
                target="_blank"
                rel="noreferrer"
              >
                Super Mario Maker 2 Public API
              </a>
              .
            </p>
            <p className="leaderboard-intro mb-4">
              To keep the leaderboard relevant, this leaderboard also makes use
              of a connected Google Sheet. This sheet contains a curated list of
              Maker IDs, and only players included in that list will appear on
              the leaderboard.
            </p>
            <p className="leaderboard-intro mb-4">
              If your Maker ID is not listed, you can search for it using the 
              search bar below or <a href="/user"> click here</a>.
            </p>
            <p className="leaderboard-intro mb-4">
              Please note that data updates are dependent on the Public API. As
              a result, it may sometimes take a little longer before the
              leaderboard is refreshed with the most recent statistics.
            </p>

            {/* Filters */}
            <div className="filters-container d-flex flex-column gap-2 mb-3">
              {/* Eerste rij: country + searchTerm */}
              <div className="d-flex gap-2">
                <div style={{ flex: "1" }}>
                  <select
                    className="form-select"
                    value={countryFilter || ""}
                    onChange={(e) => setCountryFilter(e.target.value || null)}
                  >
                    <option value="">🌍 All countries</option>
                    {uniqueCountries.map((country, i) => (
                      <option key={country + i} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ flex: "2" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search players by name..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setVisibleCount(5);
                    }}
                  />
                </div>
              </div>

              {/* Tweede rij: userCode + knop */}
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter 9-char ID..."
                  maxLength={9}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value.toUpperCase())}
                />
                <button
                  className="btn btn-primary"
                  disabled={userCode.length !== 9}
                  onClick={() => navigate(`/user/${userCode}`)}
                >
                  Search
                </button>
              </div>
            </div>

            {/* Player rows */}
            {visiblePlayers.length > 0 ? (
              visiblePlayers.map((player, index) => {
                const actualIndex = players.findIndex(
                  (p) => p.Name === player.Name
                );
                return (
                  <div
                    key={player.Name + index}
                    className="player-row-custom"
                    onClick={() => handlePlayerClick(player)}
                    style={{ cursor: player.Maker_ID ? "pointer" : "default" }}
                    title={player.Maker_ID ? "Click for more info" : ""}
                    data-aos="fade-right"
                  >
                    <div className="player-rank">
                      <div
                        className={`circle-number ${
                          actualIndex < 3 ? "top-three" : ""
                        }`}
                      >
                        {actualIndex + 1}
                      </div>
                    </div>
                    <div className="playerName">
                      <div>
                        <img
                          src={player.Country_Link}
                          alt={`Flag of ${player.Name}`}
                          className="player-flag"
                        />
                        <span>{player.Name}</span>
                      </div>
                    </div>
                    <div className="playerPB">
                      <div className="pb-label">Versus PB</div>
                      <div className="pb-value">{player.PB}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4">No players found.</div>
            )}

            {/* Show more/less buttons */}
            <div className="d-flex justify-content-end my-3 gap-2">
              {visibleCount >= 10 && (
                <button
                  className="btn btn-secondary"
                  onClick={() => setVisibleCount(5)}
                >
                  Show less
                </button>
              )}

              {visibleCount < filteredPlayers.length && (
                <button
                  className="btn btn-primary"
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                >
                  Show more
                </button>
              )}

              {visibleCount < filteredPlayers.length && (
                <button
                  className="btn btn-purple"
                  onClick={() => setVisibleCount(filteredPlayers.length)}
                >
                  Show all ({filteredPlayers.length})
                </button>
              )}
            </div>
          </div>

          {/* Side info */}
          <div className="countryDistribution col-lg-4">
            <CountryDistributionChart players={players} />
          </div>
          <div className="countryDistribution col-lg-8">
            <h3 className="mb-2">About the Player Base</h3>
            <p>
              Our community is growing rapidly across Europe. The chart shows
              the distribution of players by country, with Germany and the UK
              leading the way. More countries are joining every season, making
              the scene more competitive and diverse.
            </p>

            {/* CTA Box */}
            <div className="cta-box p-4 my-4">
              <h4 className="mb-2">🌍 Be part of the story!</h4>
              <p className="mb-4">
                Do you want to see your country grow on the leaderboard? Join
                the competition, submit your PBs, and represent your nation!
              </p>
              <button className="cta-btn"><a href="/other-leaderboards">Join the Discord!</a></button>
            </div>
          </div>
          {/* <div className="row mb-5">
            <div className="col-12">
              <MultiUserSummaryBox />
            </div>
          </div> */}
        </div>
      </div>
      {/* <div className="svg-wrapper">
        <img src="/images/underGround1.png" alt="" />
      </div> */}
    </section>
  );
};

export default Leaderboard;
