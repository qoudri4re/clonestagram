import React from "react";
import cancelIcon from "../../svgs/cancelIcon.svg";
import demo_image from "../../../demo_image.png";

function SearchItem() {
  return (
    <div className="search__item">
      <div className="left">
        <div className="story__background cursor__pointer">
          <div className="image__background">
            <img src={demo_image} alt="" />
          </div>
        </div>
        <div className="details cursor__pointer">
          <h4>Somebody Somebody</h4>
        </div>
      </div>
      <div className="right cursor__pointer">
        <img src={cancelIcon} alt="" />
      </div>
    </div>
  );
}

export default SearchItem;
