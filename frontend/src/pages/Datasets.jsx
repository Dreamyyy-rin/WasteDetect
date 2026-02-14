import React from "react";
import "./Datasets.css";

const Datasets = () => {
  return (
    <div className="datasets-page">
      <section className="datasets-hero">
        <div className="datasets-container">
          <h1 className="page-title">Datasets</h1>
          <p className="page-subtitle">
            High-quality datasets powering our waste detection models
          </p>
        </div>
      </section>

      <section className="datasets-content">
        <div className="datasets-container">
          <div className="datasets-grid">
            <div className="dataset-card">
              <h3 className="dataset-title">Original Dataset</h3>
              <p className="dataset-description">
                The original dataset is sourced from a{" "}
                <a
                  href="https://www.sciencedirect.com/science/article/pii/S277291252400071X"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-link"
                >
                  research paper
                </a>{" "}
                published in scientific literature. It contains a collection of
                waste images gathered for environmental monitoring and
                classification purposes. The dataset serves as a strong
                foundation for developing waste detection models, with
                categories including electronic, paper, plastic, glass, metal,
                and organic waste, representing common types found in real-world
                environments.
              </p>
              <a
                href="https://drive.google.com/drive/folders/11rks59IWPfutn8wwoSKShFN4Hp-BJ5wb"
                target="_blank"
                rel="noopener noreferrer"
                className="dataset-link"
              >
                <span>Access Dataset</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="dataset-card">
              <h3 className="dataset-title">CLAHE Enhanced Dataset</h3>
              <p className="dataset-description">
                This specialized dataset was created by our team through
                applying Contrast Limited Adaptive Histogram Equalization
                (CLAHE) to the original dataset. CLAHE enhances image contrast
                and visibility, particularly beneficial for detecting waste in
                challenging lighting conditions. This preprocessing technique
                significantly improves model performance in low-light and
                variable contrast scenarios.
              </p>
              <a
                href="https://drive.google.com/drive/folders/1V7EzscEFqmSKYiSD9Q6OvoWaHOh2VdwH"
                target="_blank"
                rel="noopener noreferrer"
                className="dataset-link"
              >
                <span>Access Dataset</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15 3H21V9"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 14L21 3"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datasets;
