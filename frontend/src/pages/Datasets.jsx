import React from "react";
import "./Datasets.css";
import DatasetCard from "../components/DatasetCard";
import PageHero from "../components/PageHero";

const Datasets = () => {
  return (
    <div className="datasets-page">
      <PageHero
        sectionClassName="datasets-hero"
        containerClassName="datasets-container"
        title="Datasets"
        subtitle="High-quality datasets powering our waste detection models"
      />

      <section className="datasets-content">
        <div className="datasets-container">
          <div className="datasets-grid">
            <DatasetCard
              title="Original Dataset"
              href="https://drive.google.com/drive/folders/11rks59IWPfutn8wwoSKShFN4Hp-BJ5wb"
            >
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
              classification purposes. The dataset serves as a strong foundation
              for developing waste detection models, with categories including
              electronic, paper, plastic, glass, metal, and organic waste,
              representing common types found in real-world environments.
            </DatasetCard>

            <DatasetCard
              title="CLAHE Enhanced Dataset"
              href="https://drive.google.com/drive/folders/1V7EzscEFqmSKYiSD9Q6OvoWaHOh2VdwH"
            >
              This specialized dataset was created by our team through applying
              Contrast Limited Adaptive Histogram Equalization (CLAHE) to the
              original dataset. CLAHE enhances image contrast and visibility,
              particularly beneficial for detecting waste in challenging
              lighting conditions. This preprocessing technique significantly
              improves model performance in low-light and variable contrast
              scenarios.
            </DatasetCard>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Datasets;
