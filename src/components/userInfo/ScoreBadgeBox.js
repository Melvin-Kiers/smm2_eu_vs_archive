import React from "react";

const getImageSrc = (score) => {
  if (score >= 6000) return "/images/data/pinkSbg.png";
  if (score >= 5000) return "/images/data/sPlusbg.png";
  if (score >= 4000) return "/images/data/sbg.png";
  if (score >= 3000) return "/images/data/abg.png";
  if (score >= 2000) return "/images/data/bbg.png";
  if (score >= 1000) return "/images/data/cbg.png";
  return "/images/data/dbg.png";
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
        <img src={badgeSrc} alt="rank" className="score-badge-image" />
        <div className="score-badge-score" style={{ color: textColor }}>
          {score}
        </div>
      </div>
    </div>
  );
};

export default ScoreBadgeBox;
