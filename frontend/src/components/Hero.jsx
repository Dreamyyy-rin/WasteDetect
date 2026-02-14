import React from "react";
import "./Hero.css";
import waste1 from "../assets/waste.jpg";
import waste2 from "../assets/waste2.jpg";

const Hero = () => {
  const scrollToDetection = () => {
    const element = document.getElementById("detection");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-visual-left">
          <div className="clean-grid">
            <div className="grid-card card-info-tl">
              <span className="big-num">2</span>
              <span className="card-desc">Models</span>
              <div className="badge-group">
                <span className="badge orange">v13</span>
                <span className="badge brown">v26</span>
              </div>
            </div>

            <div className="grid-card card-img-tr">
              <img src={waste2} alt="waste" className="fill-image" />
            </div>

            <div className="grid-card card-info-bl">
              <span className="big-num">3</span>
              <span className="card-desc">Detection Modes</span>
              <div className="badge-group">
                <span className="badge orange">image</span>
                <span className="badge brown">video</span>
                <span className="badge dark">live cam</span>
              </div>
            </div>

            <div className="grid-card card-img-br">
              <img src={waste1} alt="waste" className="fill-image" />
            </div>
          </div>
        </div>

        <div className="hero-content-right">
          <h1 className="hero-title">
            TerraSight: Sustainable Terra Through Smart Sight. <br />
          </h1>
          <p className="hero-subtitle">
            Helping the world see waste clearly, TerraSight combines intelligent
            vision with environmental responsibility to turn awareness into
            action. Through real-time waste detection and meaningful insights,
            we support smarter decisions that lead to cleaner spaces and a more
            sustainable future.
          </p>
          <div className="hero-actions">
            <button className="hero-cta-primary" onClick={scrollToDetection}>
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
