import React from "react";

const PageHero = ({
  sectionClassName,
  containerClassName,
  title,
  subtitle,
}) => {
  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>
    </section>
  );
};

export default PageHero;
