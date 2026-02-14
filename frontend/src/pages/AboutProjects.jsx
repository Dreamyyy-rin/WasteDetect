import React from "react";
import "./AboutProjects.css";
import christine from "../assets/christine.png";
import felicia from "../assets/felicia.jpg";
import vicko from "../assets/vicko.jpeg";
import onnx from "../assets/onnix.png";
import fastapi from "../assets/fastapi.png";
import websocket from "../assets/websocket.png";
import react from "../assets/react.png";
import python from "../assets/python.png";
import yolo from "../assets/yolo.png";

const AboutProjects = () => {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-container">
          <h1 className="page-title">About Our Project</h1>
          <p className="page-subtitle">
            Building intelligent waste detection systems for a sustainable
            future
          </p>
        </div>
      </section>

      <section className="project-overview">
        <div className="about-container">
          <h2 className="section-heading">Project Overview</h2>
          <p className="overview-text">
            TerraSight is an AI powered waste detection system designed to
            improve environmental monitoring through advanced computer vision
            technology. The platform leverages <b>YOLOv13</b> and <b>YOLOv26</b>
            , based on You Only Look Once object detection models that identify
            and classify waste in a single processing step, and integrates{" "}
            <b>CLAHE</b>, short for Contrast Limited Adaptive Histogram
            Equalization, to enhance image contrast in low visibility
            conditions. By combining intelligent detection with improved visual
            clarity, TerraSight delivers accurate real time waste recognition in
            complex environments while supporting smarter and more sustainable
            urban waste management.
          </p>

          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="feature-title">YOLOv13</h4>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="feature-title">YOLOv26</h4>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="2"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                  />
                  <circle
                    cx="8.5"
                    cy="8.5"
                    r="2.5"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                  />
                  <path
                    d="M21 15L16 10L5 21"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="feature-title">CLAHE</h4>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 6L5 4L7 6M21 6L19 4L17 6"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6H14C16.2091 6 18 7.79086 18 10V14C18 16.2091 16.2091 18 14 18H10C7.79086 18 6 16.2091 6 14V10C6 7.79086 7.79086 6 10 6Z"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                  />
                  <path
                    d="M9 20L12 22L15 20"
                    stroke="#7D5A3D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h4 className="feature-title">AI Based Waste Detection</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="about-container">
          <h2 className="section-heading">Meet Our Team</h2>
          <p className="section-description">
            Dedicated professionals working together to create innovative
            solutions
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-photo">
                <img src={christine} alt="Christine Dewi" />
              </div>
              <h3 className="team-name">Christine Dewi</h3>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src={felicia} alt="Felicia Wijaya" />
              </div>
              <h3 className="team-name">Felicia Wijaya</h3>
            </div>

            <div className="team-card">
              <div className="team-photo">
                <img src={vicko} alt="Oivicko Ekagani Irwanto" />
              </div>
              <h3 className="team-name">Oivicko Ekagani Irwanto</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="tech-stack-section">
        <div className="about-container">
          <h2 className="section-heading">Technology Stack</h2>
          <p className="section-description">
            Powered by modern tools and frameworks
          </p>

          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={yolo}
                  alt="YOLO"
                />
              </div>
              <h4 className="tech-title">YOLO</h4>
              <p className="tech-category">Object Detection</p>
            </div>

            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={onnx}
                  alt="ONNX"
                />
              </div>
              <h4 className="tech-title">ONNX Runtime</h4>
              <p className="tech-category">Model Inference</p>
            </div>

            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={fastapi}
                  alt="FastAPI"
                />
              </div>
              <h4 className="tech-title">FastAPI</h4>
              <p className="tech-category">API Framework</p>
            </div>

            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={websocket}
                  alt="WebSocket"
                />
              </div>
              <h4 className="tech-title">WebSocket</h4>
              <p className="tech-category">Real-time Communication</p>
            </div>

            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={react}
                  alt="React"
                />
              </div>
              <h4 className="tech-title">React.js</h4>
              <p className="tech-category">Frontend</p>
            </div>

            <div className="tech-card">
              <div className="tech-logo">
                <img
                  src={python}
                  alt="Python"
                />
              </div>
              <h4 className="tech-title">Python</h4>
              <p className="tech-category">Backend</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutProjects;
