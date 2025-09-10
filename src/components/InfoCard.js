import React from 'react';

const InfoCard = ({ title, text, number }) => {
  return (
    <div className="info-card p-4 mb-3 pb-1 shadow-sm">
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <div className="card-number">{number}</div>
    </div>
  );
};

export default InfoCard;
