// components/KillsStatsBox.js
import React from "react";

const KillsStatsBox = ({ userInfo }) => {
  const kills = Number(userInfo?.versus_kills) || 0;
  const killedByOthers = Number(userInfo?.versus_killed_by_others) || 0;
  const total = kills + killedByOthers;

  const kdRatio = total > 0 ? (kills / killedByOthers || kills).toFixed(2) : null;

  const killsPercent = total > 0 ? (kills / total) * 100 : 0;
  const deathsPercent = total > 0 ? (killedByOthers / total) * 100 : 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Tekststats */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", textAlign: "left" }}>
        <div><strong>Players killed:</strong> {kills}</div>
        <div><strong>Killed by other players:</strong> {killedByOthers}</div>
        <div>{total > 0 ? (<><strong>K/D:</strong> {kdRatio}</>) : (<strong>K/D: NAN</strong>)}</div>
      </div>
      {/* Progress bar */}
      {total > 0 && (
        <>
          <div style={{ 
            display: "flex", 
            height: "20px", 
            width: "100%", 
            backgroundColor: "#ddd", 
            borderRadius: "10px", 
            overflow: "hidden",
            marginTop: "0.5rem"
          }}>
            <div style={{ 
              width: `${killsPercent}%`, 
              backgroundColor: "#4BC0C0",
              transition: "width 0.5s"
            }} />
            <div style={{ 
              width: `${deathsPercent}%`, 
              backgroundColor: "#FF6384",
              transition: "width 0.5s"
            }} />
          </div>

          {/* Legenda */}
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.5rem", fontSize: "0.7rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <div style={{ width: "15px", height: "15px", backgroundColor: "#4BC0C0" }}></div>
              <span>Players killed ({kills})</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
              <div style={{ width: "15px", height: "15px", backgroundColor: "#FF6384" }}></div>
              <span>Killed by other players ({killedByOthers})</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KillsStatsBox;
