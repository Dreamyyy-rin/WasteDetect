import React from "react";
import TechCard from "./TechCard";
import yolo from "../assets/yolo.png";
import onnx from "../assets/onnix.png";
import fastapi from "../assets/fastapi.png";
import websocket from "../assets/websocket.png";
import react from "../assets/react.png";
import python from "../assets/python.png";

const TechStack = () => {
  const technologies = [
    { logo: yolo, title: "YOLO", category: "Object Detection" },
    { logo: onnx, title: "ONNX Runtime", category: "Model Inference" },
    { logo: fastapi, title: "FastAPI", category: "API Framework" },
    {
      logo: websocket,
      title: "WebSocket",
      category: "Real-time Communication",
    },
    { logo: react, title: "React.js", category: "Frontend" },
    { logo: python, title: "Python", category: "Backend" },
  ];

  return (
    <section className="tech-stack-section">
      <div className="about-container">
        <h2 className="section-heading">Technology Stack</h2>
        <p className="section-description">
          Powered by modern tools and frameworks
        </p>

        <div className="tech-grid">
          {technologies.map((tech, index) => (
            <TechCard
              key={index}
              logo={tech.logo}
              title={tech.title}
              category={tech.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
