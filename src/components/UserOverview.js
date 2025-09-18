import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useNavigate } from "react-router-dom";

const UserOverview = () => {
  const [players, setPlayers] = useState([]);
  const [countryFilter, setCountryFilter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userCode, setUserCode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [playersPerPage, setPlayersPerPage] = useState(20); // 🔹 standaard 20
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
    <>
      <img src="/images/underGround1.png" alt="" className="section-divider-top" />
      <section className="user-overview pt-5">
        <div className="container">
          <h2 className="mb-4">All Players</h2>
          <div className="d-flex justify-content-between align-items-center mb-3">
            {/* Links: terug knop */}
            <button
                className="btn btn-outline-primary"
                onClick={() => navigate("/")}
            >
                ← Back to Homepage
            </button>

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
          <div className="d-flex justify-content-between align-items-center mt-3">
            <button
              className="btn btn-secondary"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            <span>
              Page {currentPage} of {totalPages}
            </span>

            <button
              className="btn btn-primary"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next →
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserOverview;
