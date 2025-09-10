import React from "react";

const VersusRankName = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <div>
      <strong>Versus Rank Name:</strong><br />
      {userInfo.versus_rank_name}
    </div>
  );
};

export default VersusRankName;