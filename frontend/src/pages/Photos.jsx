import React from "react";
import "./Photos.css";
import plastic from "../assets/plastic.png";
import paper from "../assets/paper.png";
import glass from "../assets/glass.png";
import vs from "../assets/ori vs clahe.png";
import waste3 from "../assets/waste3.jpg";
import waste4 from "../assets/waste4.jpg";
import waste5 from "../assets/waste5.jpg";
import PhotoCard from "../components/PhotoCard";
import PageHero from "../components/PageHero";

const Photos = () => {
  return (
    <div className="photos-page">
      <PageHero
        sectionClassName="photos-hero"
        containerClassName="photos-container"
        title="Photos"
        subtitle="Explore our waste detection results"
      />

      <section className="photos-content">
        <div className="photos-container">
          <div className="photos-grid">
            <PhotoCard src={vs} />
            <PhotoCard src={plastic} />
            <PhotoCard src={waste3} />
            <PhotoCard src={glass} />
            <PhotoCard src={paper} />
            <PhotoCard src={waste4} />
            <PhotoCard src={waste5} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photos;
