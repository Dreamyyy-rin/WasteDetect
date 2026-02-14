import React from "react";
import TeamCard from "./TeamCard";
import christine from "../assets/christine.png";
import felicia from "../assets/felicia.jpg";
import vicko from "../assets/vicko.jpeg";

const TeamSection = () => {
  const teamMembers = [
    { photo: christine, name: "Christine Dewi" },
    { photo: felicia, name: "Felicia Wijaya" },
    { photo: vicko, name: "Oivicko Ekagani Irwanto" },
  ];

  return (
    <section className="team-section">
      <div className="about-container">
        <h2 className="section-heading">Meet Our Team</h2>
        <p className="section-description">
          Dedicated professionals working together to create innovative
          solutions
        </p>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} photo={member.photo} name={member.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
