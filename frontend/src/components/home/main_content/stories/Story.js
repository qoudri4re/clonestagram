import React from "react";
import demo_image from "../../../../demo_image.png";
function Story({ username, profileImage }) {
  return (
    <div className="story">
      <div className="image__background">
        <img src={demo_image} alt="" />
      </div>
      <p>{username.length > 9 ? username.substring(0, 6) + "..." : username}</p>
    </div>
  );
}

export default Story;
