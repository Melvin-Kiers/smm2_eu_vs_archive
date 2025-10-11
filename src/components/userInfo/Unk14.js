import React from "react";

const MultiplayerStatsUnk14 = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <div>
      <strong>Multiplayer Stats Unk14:</strong><br />
      {userInfo.multiplayer_stats_unk14}
    </div>
  );
};

export default MultiplayerStatsUnk14;