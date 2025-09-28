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
];

const YouTubeCards = () => {
  const [selectedFilters] = useState([]);
  const [search] = useState("");


  const filteredClips = youtubeClips.filter((clip) => {
    const matchesFilter =
      selectedFilters.length === 0 ||
      selectedFilters.some((cat) => clip.extra.includes(cat));

    const matchesSearch = clip.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <section className="video-section divider pb-5">
      <div className="container">
        <h2 className="section-title pt-5">
          EU VS <span className="orange">Highlights</span>
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

        {/* Video grid */}
        <div className="row">
          {filteredClips.map((clip, index) => (
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

        {filteredClips.length === 0 && <p>No videos found...</p>}
        <div className="filters mb-3 d-flex justify-content-between align-items-center">
          <div className="filters-right mt-3">
            <a href="/videos" className="more-videos-btn">
              More Highlights →
            </a>
          </div>
        </div>
      </div>

      <div className="platform-wrapper">
        <div className="smb1_platform">
          <img src="/images/smb1_platform.png" alt="SMB1 moving platform" />
        </div>
      </div>
    </section>
  );
};

export default YouTubeCards;
