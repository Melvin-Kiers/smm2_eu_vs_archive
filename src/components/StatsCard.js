import React from 'react';

const StatsCard = ({ title, text, number, image }) => {
  return (
    <div className="info-stats-card mb-3 p-4">
      <h3 className="stats-card-title">{title}</h3>
      <p className="stats-card-text">{text}</p>

      <div className="stats-card-footer">
        {image && (
          <img 
            src={image} 
            alt={title} 
            className="stats-card-img" 
          />
        )}
        <div className="stats-card-number">{number}</div>
      </div>
    </div>
  );
};

export default StatsCard;
