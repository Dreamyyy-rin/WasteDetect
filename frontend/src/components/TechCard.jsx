import React from "react";

const TechCard = ({ logo, title, category }) => {
  return (
    <div className="tech-card">
      <div className="tech-logo">
        <img src={logo} alt={title} />
      </div>
      <h4 className="tech-title">{title}</h4>
      <p className="tech-category">{category}</p>
    </div>
  );
};

export default TechCard;
