import React from "react";

const ContactCard = ({ photo, name, href, email }) => {
  return (
    <div className="contact-card">
      <div className="contact-photo">
        <img src={photo} alt={name} />
      </div>
      <h3 className="contact-name">{name}</h3>
      <a href={href} className="contact-email">
        {email}
      </a>
    </div>
  );
};

export default ContactCard;
