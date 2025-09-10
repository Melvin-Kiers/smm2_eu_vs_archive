import React from "react";

const youtubeClips = [
  {
    title: "POW moment!",
    youtubeId: "8l6URcqkeCc",
    description: "Een iconisch Mario moment met de POW block.",
    extra: "Category: Mario Bros",
  },
  {
    title: "The real way to kill your opponents",
    youtubeId: "k_ShSQZO_ws",
    description: "Een slimme strategie in SMB1 multiplayer.",
    extra: "Category: Speedrun",
  },
  {
    title: '"Oh, Thanks"',
    youtubeId: "aN5JLx2qd0A",
    description: "Klassiek hilarisch moment tijdens het streamen.",
    extra: "Category: Funny Clips",
  },
];

const YouTubeCards = () => {
  return (
    <section className="video-section">
      <div className="container">
        <h2 className="section-title pt-5">EU VS Highlights</h2>
        <p className="section-subtitle">
          Bekijk hier onze leukste momenten en hoogtepunten uit de streams.
        </p>

        <div className="row">
          {youtubeClips.map((clip, index) => (
            <div className="col-md-12 col-lg-4 col-sm-12 col-12 mb-3" key={index}>
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
                  <h3>{clip.title}</h3>
                  <p>{clip.description}</p>
                  <span className="extra-info">{clip.extra}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="svg-wrapper">
        <img src="/images/underGround1.png" alt="" />
      </div>
    </section>
    
  );
};

export default YouTubeCards;
