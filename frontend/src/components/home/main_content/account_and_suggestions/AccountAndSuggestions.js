import React from "react";
import demo_image from "../../../../demo_image.png";
import Suggestion from "./Suggestion";

function AccountAndSuggestions({ username }) {
  return (
    <div className="account__suggestions">
      <div className="account">
        <div className="account__left">
          <div className="image__background">
            <img src={demo_image} alt="" />
          </div>
          <div className="username">
            <h4>{username}</h4>
          </div>
        </div>
        <div className="account__right">
          <h4>Switch</h4>
        </div>
      </div>
      <div className="suggestions">
        <div className="suggestions__header">
          <div className="suggestions__header__left">
            <h4>Suggestions For You</h4>
          </div>
          <div className="suggestions__header__right">
            <h4>See All</h4>
          </div>
        </div>
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
        <Suggestion />
      </div>
    </div>
  );
}

export default AccountAndSuggestions;
