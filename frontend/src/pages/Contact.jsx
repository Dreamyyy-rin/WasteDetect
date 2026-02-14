import React from "react";
import "./Contact.css";
import christinePhoto from "../assets/christine.png";
import feliciaPhoto from "../assets/felicia.jpg";
import vickoPhoto from "../assets/vicko.jpeg";

const Contact = () => {
  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-container">
          <h1 className="page-title">Get in Touch</h1>
          <p className="page-subtitle">
            Have questions or want to collaborate? Reach out to our team
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-photo">
                <img src={christinePhoto} alt="Christine Dewi" />
              </div>
              <h3 className="contact-name">Christine Dewi</h3>
              <a
                href="mailto:christine.dewi@example.com"
                className="contact-email"
              >
                christine.dewi13@gmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-photo">
                <img src={feliciaPhoto} alt="Felicia Wijaya" />
              </div>
              <h3 className="contact-name">Felicia Wijaya</h3>
              <a
                href="mailto:felicia.wijaya@example.com"
                className="contact-email"
              >
                feliciawijaya1910@gmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-photo">
                <img src={vickoPhoto} alt="Oivicko Ekagani Irwanto" />
              </div>
              <h3 className="contact-name">Oivicko Ekagani Irwanto</h3>
              <a
                href="mailto:oivicko.ekagani@example.com"
                className="contact-email"
              >
                oivicko020405@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
