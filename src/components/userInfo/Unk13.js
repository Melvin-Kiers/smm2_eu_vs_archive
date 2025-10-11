import React from "react";

const MultiplayerStatsUnk13 = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <div>
      <strong>Multiplayer Stats Unk13:</strong><br />
      {userInfo.multiplayer_stats_unk13}
    </div>
  );
};

export default MultiplayerStatsUnk13;