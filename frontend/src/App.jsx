import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AboutProjects from "./pages/AboutProjects";
import Photos from "./pages/Photos";
import Datasets from "./pages/Datasets";
import Contact from "./pages/Contact";
import "./App.css";

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutProjects />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/datasets" element={<Datasets />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-container">
            <p>&copy; 2026 TerraSight. Waste Detection System.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}
