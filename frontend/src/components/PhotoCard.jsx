import React from "react";

const PhotoCard = ({ src }) => {
  return (
    <div className="photo-card">
      <img src={src} />
    </div>
  );
};

export default PhotoCard;
