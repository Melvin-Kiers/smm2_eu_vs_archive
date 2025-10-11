import React from "react";
import "../css/SubLeaderBoards.css";

const IntroSubLeaderboards = ({ title, text }) => {
  return (
    <div className="title-sub-leaderboard mt-5">
      {/* Titel met HTML-ondersteuning */}
      <h3
        className="title mb-3"
        dangerouslySetInnerHTML={{ __html: title }}
      ></h3>

      {/* Normale tekst */}
      <p className="text mb-4">{text}</p>
    </div>
  );
};

export default IntroSubLeaderboards;
