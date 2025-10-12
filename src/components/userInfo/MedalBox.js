import React from "react";

const getMedalImage = (userInfo) => {
  if (!userInfo || !userInfo.badges) return "";

  const badge = userInfo.badges.find((b) => b.type === 5);
  if (!badge) return "";

  const basePath = process.env.PUBLIC_URL + "/images/data/";

  switch (badge.rank_name) {
    case "Gold":
      return basePath + "medalGold.png";
    case "Silver":
      return basePath + "medalSilver.png";
    case "Bronze":
      return basePath + "medalBronze.png";
    case "Gold Ribbon":
      return basePath + "medalGoldRibbon.png";
    case "Silver Ribbon":
      return basePath + "medalSilverRibbon.png";
    case "Bronze Ribbon":
      return basePath + "medalBronzeRibbon.png";
    default:
      return "";
  }
};

const getMedalText = (userInfo) => {
  if (!userInfo || !userInfo.badges) return "";

  const badge = userInfo.badges.find((b) => b.type === 5);
  if (!badge) return `${userInfo.name} has currently no medal in VS mode!`;

  return `${userInfo.name} has a ${badge.rank_name} medal in VS mode`;
};

const MedalBox = ({ userInfo }) => {
  const medalImage = getMedalImage(userInfo);
  const medalText = getMedalText(userInfo);

  return (
    <div className="medal-box">
      <div className="medal-text">
        <p>{medalText}</p>
      </div>

      {medalImage && (
        <img src={medalImage} alt="Medal" className="medal-image" />
      )}
    </div>
  );
};

export default MedalBox;
