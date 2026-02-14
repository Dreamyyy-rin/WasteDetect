import React from "react";

const TeamCard = ({ photo, name }) => {
  return (
    <div className="team-card">
      <div className="team-photo">
        <img src={photo} alt={name} />
      </div>
      <h3 className="team-name">{name}</h3>
    </div>
  );
};

export default TeamCard;
