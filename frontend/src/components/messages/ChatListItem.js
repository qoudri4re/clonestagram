import React from "react";
import demo_image from "../../demo_image.png";

function ChatListItem({ handleChatClick }) {
  return (
    <div className="chatlist__item" onClick={handleChatClick}>
      <div className="image__background">
        <img src={demo_image} alt="" />
      </div>
      <div className="details">
        <p>Username here</p>
        <span>Hello · 2w</span>
      </div>
    </div>
  );
}

export default ChatListItem;
