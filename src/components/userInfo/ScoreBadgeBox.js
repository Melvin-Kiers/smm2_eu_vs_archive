import React from "react";

const getImageSrc = (score) => {
  const basePath = process.env.PUBLIC_URL + "/images/data/";

  if (score >= 6000) return basePath + "pinkSbg.png";
  if (score >= 5000) return basePath + "sPlusbg.png";
  if (score >= 4000) return basePath + "sbg.png";
  if (score >= 3000) return basePath + "abg.png";
  if (score >= 2000) return basePath + "bbg.png";
  if (score >= 1000) return basePath + "cbg.png";
  return basePath + "dbg.png";
};

const getTextColor = (score) => {
  return score >= 6000 ? "#FFD700" : "#FFFFFF";
};

const ScoreBadgeBox = ({ userInfo }) => {
  const score = Number(userInfo?.versus_rating) || 0;
  const badgeSrc = getImageSrc(score);
  const textColor = getTextColor(score);

  return (
    <div className="score-badge-box">
      <div className="score-badge-wrapper">
        <img
          src={badgeSrc}
          alt="Rank badge"
          className="score-badge-image"
        />
        <div
          className="score-badge-score"
          style={{ color: textColor }}
        >
          {score}
        </div>
      </div>
    </div>
  );
};

export default ScoreBadgeBox;
