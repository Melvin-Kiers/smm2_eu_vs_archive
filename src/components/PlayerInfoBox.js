// components/PlayerInfoBox.js
import React from "react";

function formatUserCode(code) {
  if (!code) return "";
  return code.match(/.{1,3}/g)?.join("-") || code;
}

const PlayerInfoBox = ({ userInfo }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
        width: "100%",
        marginTop: "18px",
      }}
    >
      {userInfo.mii_image && (
        <img
          src={userInfo.mii_image}
          alt="Mii-Image"
          className="mii-image"
        />
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
          textAlign: "left",
          flex: "1 1 250px",
        }}
      >
        {/* Naam bovenaan */}
        <div>
          <strong>Name:</strong> {userInfo.name}
        </div>

        {/* Country met naam, vlag en code */}
        {userInfo.country && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.1rem",
            }}
          >
            <strong>Country:</strong>
            <span>{userInfo.country_name}</span>
            <img
              src={`https://flagcdn.com/24x18/${userInfo.country.toLowerCase()}.png`}
              alt={`${userInfo.country} flag`}
              style={{ width: "24px", height: "18px", objectFit: "cover" }}
            />
            <span>({userInfo.country})</span>
          </div>
        )}

        {/* Code */}
        <div>
          <strong>Code:</strong> {formatUserCode(userInfo.code)}
        </div>

        {/* Last played */}
        <div>
          <strong>Last played:</strong> {userInfo.last_active_pretty} (UTC)
        </div>
        <div>
          <strong>PID:</strong> {userInfo.pid}
        </div>
      </div>
    </div>
  );
};

export default PlayerInfoBox;

