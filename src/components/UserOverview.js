import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";
import CountryDistributionChart from "./CountryDistributionChart";

const UserOverview = () => {
  const [players, setPlayers] = useState([]);
  const [countryFilter, setCountryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCode, setUserCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(10); // 🔹 standaard 10
  const navigate = useNavigate();

  // 📥 CSV inladen
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
          }))
          .filter((p) => p.PB && !isNaN(p.PB))
          .sort((a, b) => Number(b.PB) - Number(a.PB));

        setPlayers(cleanedPlayers);
      });
  }, []);

  // 📌 Scroll naar boven bij paginawissel
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // 📌 hash uit de URL lezen bij laden
  useEffect(() => {
    const hash = window.location.hash.replace("#page", "");
    const pageNum = parseInt(hash, 10);
    if (!isNaN(pageNum) && pageNum > 0) {
      setCurrentPage(pageNum);
    }
  }, []);

  // 📌 hash updaten als pagina verandert
  useEffect(() => {
    window.location.hash = `page${currentPage}`;
  }, [currentPage]);

  // 🔍 Filters
  const uniqueCountries = [...new Set(players.map((p) => p.Country_Name))].filter(Boolean);

  const filteredPlayers = players.filter((p) => {
    const matchesCountry = countryFilter ? p.Country_Name === countryFilter : true;
    const matchesSearch = searchTerm
      ? p.Name.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchesCountry && matchesSearch;
  });

  // 📄 Paginatie berekenen
  const indexOfLast = currentPage * playersPerPage;
  const indexOfFirst = indexOfLast - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  return (
      <section className="user-overview pt-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Links: terug knop */}
            <h2 className="leaderboard-title mb-2">
              European PB <span>Leaderboard</span>
            </h2>

            {/* Rechts: players per page selector */}
            <div className="d-flex align-items-center">
                <label htmlFor="playersPerPage" className="me-2 mb-0">
                Players per page:
                </label>
                <select
                id="playersPerPage"
                className="form-select"
                style={{ width: "auto" }}
                value={playersPerPage}
                onChange={(e) => setPlayersPerPage(Number(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={filteredPlayers.length}>All</option>
                </select>
            </div>
          </div>

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
            Please note that data updates are dependent on the Public API. As
            a result, it may sometimes take a little longer before the
            leaderboard is refreshed with the most recent statistics.
          </p>

          <button
              className="btn btn-purple my-3"
              onClick={() => navigate("/")}>
              ← Back to Homepage
          </button>

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
                  placeholder="Search players..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
          {currentPlayers.map((player, index) => {
            const actualIndex = players.findIndex((p) => p.Name === player.Name);

            return (
              <div
                key={player.Name + index}
                className="player-row-custom"
                onClick={() =>
                  player.Maker_ID && navigate(`/user/${player.Maker_ID}`)
                }
                style={{ cursor: player.Maker_ID ? "pointer" : "default" }}
                title={player.Maker_ID ? "Click for more info" : ""}
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
          })}

          {/* Pagination controls */}
          <div className="d-flex justify-content-between align-items-center mt-3 text-white gap-2">
            {/* Linkerkant: First + Prev */}
            <div className="d-flex gap-2">
              {currentPage > 1 && (
                <button
                  className="btn btn-outline-light"
                  onClick={() => setCurrentPage(1)}
                >
                  « First
                </button>
              )}

              <button
                className="btn btn-secondary"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                ← Prev
              </button>
            </div>

            {/* Middenstuk */}
            <span>
              Page {currentPage} of {totalPages}
            </span>

            {/* Rechterkant: Next + Last */}
            <div className="d-flex gap-2">
              <button
                className="btn btn-primary"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next →
              </button>

              {currentPage < totalPages && (
                <button
                  className="btn btn-outline-light"
                  onClick={() => setCurrentPage(totalPages)}
                >
                  Last »
                </button>
              )}
            </div>
          </div>
          
          {/* Side info */}
          <div className="row mt-5">
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
              <div className="cta-box p-4 mt-4">
                <h4 className="mb-2">🌍 Be part of the story!</h4>
                <p className="mb-4">
                  Do you want to see your country grow on the leaderboard? Join
                  the competition, submit your PBs, and represent your nation!
                </p>
                <button className="cta-btn">Join the Discord!</button>
              </div>
            </div>
          </div>
        </div>
                <div className="svg-wrapper">
        <img src={process.env.PUBLIC_URL + "/images/underGround1.png"} alt="" />
      </div>
      </section>
  );
};

export default UserOverview;
