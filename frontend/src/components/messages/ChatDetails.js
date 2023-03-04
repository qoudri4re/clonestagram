import React from "react";
import darkDetails_icon from "../svgs/darkDetailsIcon.svg";
import demo_image from "../../demo_image.png";

function ChatDetails({ hideOrShowDetails }) {
  return (
    <div className="chat__details">
      <div className="chat__details__header">
        <div className="chat__details__header__left">
          <h3>Details</h3>
        </div>
        <div className="chat__details__header__right">
          <img src={darkDetails_icon} alt="" onClick={hideOrShowDetails} />
        </div>
      </div>
      <div className="mute__options">
        <div className="mute__options__item">
          <input type="checkbox" />
          <span>Mute Messages</span>
        </div>
        <div className="mute__options__item">
          <input type="checkbox" />
          <span>Mute Call Notifications</span>
        </div>
      </div>
      <div className="details__members">
        <div className="details__members__header">
          <h3>Members</h3>
        </div>
        <div className="details__member">
          <div className="image__background">
            <img src={demo_image} alt="" />
          </div>
          <h4>Username here</h4>
        </div>
      </div>
      <div className="chat__settings">
        <span>Delete Chat</span>
        <span>Block</span>
        <span>Report</span>
      </div>
    </div>
  );
}

export default ChatDetails;
