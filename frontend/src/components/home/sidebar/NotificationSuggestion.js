import React from "react";
import demo_image from "../../../demo_image.png";

function NotificationSuggestion() {
  return (
    <div className="suggestion__item">
      <div className="left">
        <div className="image__background">
          <img src={demo_image} alt="" />
        </div>
        <div className="details">
          <h4>Somebody somebody</h4>
          <span>follows You</span>
        </div>
      </div>
      <div className="right">
        <button>Follow</button>
      </div>
    </div>
  );
}

export default NotificationSuggestion;
