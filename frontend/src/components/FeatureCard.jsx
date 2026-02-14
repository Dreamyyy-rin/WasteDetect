import React from "react";

const FeatureCard = ({ icon, title }) => {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h4 className="feature-title">{title}</h4>
    </div>
  );
};

export default FeatureCard;
