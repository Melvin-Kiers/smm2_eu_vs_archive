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
    ? process.env.PUBLIC_URL + "/images/data/winStreak.png"
    : isLosing
    ? process.env.PUBLIC_URL + "/images/data/loseStreak.png"
    : null;

  return (
    <div className="streak-box">
      <div className="streak-text-container">
        <div className="streak-player-name">{name}</div>
        <div>{streakText}</div>
      </div>

      {arrowSrc && (
        <img
          src={arrowSrc}
          alt={isWinning ? "Up Arrow" : "Down Arrow"}
          className="streak-arrow"
        />
      )}
    </div>
  );
};

export default StreakInfoBox;
