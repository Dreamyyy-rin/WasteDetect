import React from "react";
import "./Contact.css";
import christinePhoto from "../assets/christine.png";
import feliciaPhoto from "../assets/felicia.jpg";
import vickoPhoto from "../assets/vicko.jpeg";
import ContactCard from "../components/ContactCard";
import PageHero from "../components/PageHero";

const Contact = () => {
  return (
    <div className="contact-page">
      <PageHero
        sectionClassName="contact-hero"
        containerClassName="contact-container"
        title="Get in Touch"
        subtitle="Have questions or want to collaborate? Reach out to our team"
      />

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            <ContactCard
              photo={christinePhoto}
              name="Christine Dewi"
              href="mailto:christine.dewi@example.com"
              email="christine.dewi13@gmail.com"
            />
            <ContactCard
              photo={feliciaPhoto}
              name="Felicia Wijaya"
              href="mailto:felicia.wijaya@example.com"
              email="feliciawijaya1910@gmail.com"
            />
            <ContactCard
              photo={vickoPhoto}
              name="Oivicko Ekagani Irwanto"
              href="mailto:oivicko.ekagani@example.com"
              email="oivicko020405@gmail.com"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
