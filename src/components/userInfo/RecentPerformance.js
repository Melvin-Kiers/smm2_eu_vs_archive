import React from "react";

const RecentPerformance = ({ userInfo }) => {
  if (!userInfo) return null;

  return (
    <div>
      <strong>Recent Performance:</strong><br /> 
      {userInfo.recent_performance}
    </div>
  );
};

export default RecentPerformance;