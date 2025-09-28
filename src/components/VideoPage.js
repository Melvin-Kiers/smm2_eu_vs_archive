import React, { useState } from "react";

const youtubeClips = [
  {
    title: "POW moment!",
    youtubeId: "8l6URcqkeCc",
    description: "Een iconisch Mario moment met de POW block.",
    extra: "Category: Mario Bros",
    gamestyle: "NSMBU",
    user: "LeonLeonidis",
    date: "2023-05-12",
  },
  {
    title: "The real way to kill your opponents",
    youtubeId: "k_ShSQZO_ws",
    description: "Een slimme strategie in SMB1 multiplayer.",
    extra: "Category: Speedrun",
    gamestyle: "NSMBU",
    user: "SpeedyMario",
    date: "2023-07-20",
  },
  {
    title: '"Oh, Thanks"',
    youtubeId: "aN5JLx2qd0A",
    description: "Klassiek hilarisch moment tijdens het streamen.",
    extra: "Category: Funny Clips",
    gamestyle: "SMW",
    user: "Peachy",
    date: "2022-12-01",
  },
    {
    title: "POW moment!",
    youtubeId: "8l6URcqkeCc",
    description: "Een iconisch Mario moment met de POW block.",
    extra: "Category: Mario Bros",
    gamestyle: "NSMBU",
    user: "LeonLeonidis",
    date: "2023-05-12",
  },
  {
    title: "POW moment!",
    youtubeId: "zuzCAx1Goqc",
    description: "Een iconisch Mario moment met de POW block.",
    extra: "Category: Mario Bros",
    gamestyle: "SMB3",
    user: "BowserKing",
    date: "2023-01-15",
  },
  {
    title: "The real way to kill your opponents",
    youtubeId: "3GX5Y2pQpPs",
    description: "Een slimme strategie in SMB1 multiplayer.",
    extra: "Category: Speedrun",
    gamestyle: "SM3DW",
    user: "ToadetteFan",
    date: "2023-03-05",
  },
  {
    title: '"WHY ARE YOU LETTING TOADETTE WIN!!!!!!??????"',
    youtubeId: "z8-rSUxdVoU",
    description: "Klassiek hilarisch moment tijdens het streamen.",
    extra: "Category: Funny Clips",
    gamestyle: "SMB1",
    user: "StreamerX",
    date: "2023-04-10",
  },
    {
    title: "POW moment!",
    youtubeId: "8l6URcqkeCc",
    description: "Een iconisch Mario moment met de POW block.",
    extra: "Category: Mario Bros",
    gamestyle: "NSMBU",
    user: "LeonLeonidis",
    date: "2023-05-12",
  }
];

const VideosPage = () => {
  const [activeFilters, setActiveFilters] = useState(["All"]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [visibleCount, setVisibleCount] = useState(6);
  const [gamestyleFilter, setGamestyleFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  // eslint-disable-next-line
  const categories = ["All", "Mario Bros", "Speedrun", "Funny Clips"];
  const gamestyles = ["All", "SMB1", "SMB3", "SMW", "NSMBU", "SM3DW"];
  const users = ["All", "LeonLeonidis", "Jordi V", "Peachy", "BowserKing", "ToadetteFan", "StreamerX"];

  // toggle filter logic for categories
  // eslint-disable-next-line
  const toggleFilter = (cat) => {
    if (cat === "All") {
      setActiveFilters(["All"]);
      return;
    }

    let updatedFilters = [...activeFilters];
    if (updatedFilters.includes("All")) {
      updatedFilters = [];
    }

    if (updatedFilters.includes(cat)) {
      updatedFilters = updatedFilters.filter((f) => f !== cat);
      if (updatedFilters.length === 0) {
        updatedFilters = ["All"];
      }
    } else {
      updatedFilters.push(cat);
    }

    setActiveFilters(updatedFilters);
  };

  // filtering + search + sorting
  const filteredClips = youtubeClips
    .filter((clip) => {
      const matchesCategory =
        activeFilters.includes("All") ||
        activeFilters.some((cat) => clip.extra.includes(cat));

      const matchesGamestyle =
        gamestyleFilter === "All" || clip.gamestyle === gamestyleFilter;

      const matchesUser =
        userFilter === "All" || clip.user === userFilter;

      const matchesSearch = clip.title
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesGamestyle && matchesUser && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date) - new Date(a.date);
      }
      if (sortBy === "alphabetical") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const visibleClips = filteredClips.slice(0, visibleCount);

  return (
    <section className="video-section divider pb-5">
      <div className="container">
        <h2 className="section-title pt-5">
          All <span className="orange">Videos</span>
        </h2>
        <p className="section-subtitle">
          This section provides a preview of some of the exciting clips available.
          If you’d like to explore the full range of content, we invite you to visit{" "}
          <a
            href="https://vscliptournament.com"
            className="clipsLink"
            target="_blank"
            rel="noreferrer"
          >
            vscliptournament.com.
          </a>{" "}
          There, you will find complete tournaments, curated highlights, and a
          growing library of match footage. It’s the best place to discover new
          players and relive unforgettable moments. Our community continues to
          expand, and the collection grows every week. Start exploring today and
          experience the full tournament atmosphere.
        </p>

        {/* Controls row */}
        <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
            {/* Links: zoekveld */}
            <div className="filters-left">
                <input
                type="text"
                placeholder="Search videos..."
                className="search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Rechts: dropdowns */}
            <div className="filters-right d-flex flex-wrap gap-2">
                <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                >
                <option value="recent">Most recent</option>
                <option value="alphabetical">Alphabetical</option>
                </select>

                <select
                className="sort-select"
                value={gamestyleFilter}
                onChange={(e) => setGamestyleFilter(e.target.value)}
                >
                {gamestyles.map((style) => (
                    <option key={style} value={style}>
                    {style}
                    </option>
                ))}
                </select>

                <select
                className="sort-select"
                value={userFilter}
                onChange={(e) => setUserFilter(e.target.value)}
                >
                {users.map((u) => (
                    <option key={u} value={u}>
                    {u}
                    </option>
                ))}
                </select>
            </div>
        </div>


        {/* Video grid */}
        <div className="row">
          {visibleClips.map((clip, index) => (
            <div
              className="col-md-6 col-lg-4 col-sm-12 col-12 mb-3"
              key={index}
            >
              <div className="video-card">
                <div className="iframe-wrapper">
                  <iframe
                    src={`https://www.youtube.com/embed/${clip.youtubeId}?rel=0`}
                    title={clip.title}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
                <div className="card-body">
                  <div className="ribbon-wrapper mb-5">
                    <h3>{clip.title}</h3>
                  </div>
                  <p>{clip.description}</p>
                  {/* <p><small className="video-date">{clip.date}</small></p> */}
                  <div className="d-flex flex-wrap gap-2 py-2">
                    {/* <span className="extra-info">{clip.extra}</span> */}
                    <span className="extra-info user">{clip.user}</span>
                    <span className="extra-info gamestyle">{clip.gamestyle}</span>
                    <span className="extra-info date">{clip.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {visibleClips.length < filteredClips.length && (
          <div className="text-center my-4">
            <button
              className="filter-btn"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More ↓
            </button>
          </div>
        )}

        {filteredClips.length === 0 && <p>No videos found...</p>}
      </div>
    </section>
  );
};

export default VideosPage;
