import React from "react";
import demo_image from "../../../../demo_image.png";

function Suggestion() {
  return (
    <div className="suggestion__item">
      <div className="suggestion__item__left">
        <div className="image__background">
          <img src={demo_image} alt="" />
        </div>
        <div className="suggestion__details">
          <h4>Somebody_somebody</h4>
          <p>Follows you</p>
        </div>
      </div>
      <div className="suggestion__item__right">
        <h4>Follow</h4>
      </div>
    </div>
  );
}

export default Suggestion;
