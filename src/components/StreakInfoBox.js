// components/StreakInfoBox.js
import React from "react";

const StreakInfoBox = ({ userInfo }) => {
  const hasPlayed = userInfo?.versus_plays > 0;
  const winStreak = Number(userInfo?.versus_win_streak) || 0;
  const loseStreak = Number(userInfo?.versus_lose_streak) || 0;
  const name = userInfo?.name || "This player";

  const isWinning = winStreak > loseStreak && winStreak > 0;
  const isLosing = loseStreak > winStreak && loseStreak > 0;

  const streakText = !hasPlayed
    ? `${name} has never played a game!`
    : isWinning
    ? `is currently on a ${winStreak} winning streak!`
    : `is currently on a ${loseStreak} losing streak!`;

  const arrowSrc = isWinning
    ? "/images/data/winStreak.png"
    : isLosing
    ? "/images/data/loseStreak.png"
    : null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          textAlign: "left",  // Zorgt dat tekst links uitgelijnd is
          flex: 1 // zodat het genoeg ruimte neemt en de pijl rechts blijft
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{name}</div>
        <div>{streakText}</div>
      </div>

      {arrowSrc && (
        <img
          src={arrowSrc}
          alt={isWinning ? "Up Arrow" : "Down Arrow"}
          style={{ width: "3em", height: "auto" }}
        />
      )}
    </div>
  );
};

export default StreakInfoBox;
