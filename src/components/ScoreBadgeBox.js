// components/ScoreBadgeBox.js
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
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: 200, height: 200 }}>
        <img
          src={badgeSrc}
          alt="rank"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
        <div
          style={{
            position: "absolute",
            top: "70%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: textColor,
            fontWeight: "bold",
            fontSize: "1rem",
            textShadow: "0 0 5px rgba(0,0,0,0.5)",
          }}
        >
          {score}
        </div>
      </div>
    </div>
  );
};

export default ScoreBadgeBox;
