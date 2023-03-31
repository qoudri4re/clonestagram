import React from "react";
import photoVideoIcon from "../svgs/photoVideoIcon.svg";

function CreatePost() {
  return (
    <div className="create__post">
      <div className="create__post__header">
        <h3>Create new post</h3>
      </div>
      <div className="create__post__body">
        <div className="create__post__content">
          <img src={photoVideoIcon} alt="" />
          <p>Drag photos and videos here</p>
          <button>Select from computer</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
