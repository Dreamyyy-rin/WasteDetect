import React from "react";
import "./Photos.css";
import plastic from "../assets/plastic.png";
import paper from "../assets/paper.png";
import glass from "../assets/glass.png";
import vs from "../assets/ori vs clahe.png";
import waste3 from "../assets/waste3.jpg";
import waste4 from "../assets/waste4.jpg";
import waste5 from "../assets/waste5.jpg";

const Photos = () => {
  return (
    <div className="photos-page">
      <section className="photos-hero">
        <div className="photos-container">
          <h1 className="page-title">Photos</h1>
          <p className="page-subtitle">
            Explore our waste detection results
          </p>
        </div>
      </section>

      <section className="photos-content">
        <div className="photos-container">
          <div className="photos-grid">
            <div className="photo-card">
              <img src={vs}  />
            </div>

            <div className="photo-card">
              <img src={plastic}  />
            </div>

            <div className="photo-card">
              <img src={waste3}  />
            </div>

            <div className="photo-card">
              <img src={glass}  />
            </div>

            <div className="photo-card">
              <img src={paper}  />
            </div>

            <div className="photo-card">
              <img src={waste4}  />
            </div>

            <div className="photo-card">
              <img src={waste5}  />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Photos;
