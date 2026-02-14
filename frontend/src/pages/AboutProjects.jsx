import React from "react";
import "./AboutProjects.css";
import ProjectHero from "../components/ProjectHero";
import ProjectOverview from "../components/ProjectOverview";
import TeamSection from "../components/TeamSection";
import TechStack from "../components/TechStack";

const AboutProjects = () => {
  return (
    <div className="about-page">
      <ProjectHero />
      <ProjectOverview />
      <TeamSection />
      <TechStack />
    </div>
  );
};

export default AboutProjects;
