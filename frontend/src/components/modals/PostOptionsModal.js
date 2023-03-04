import React from "react";

function PostOptionsModal({ toogleDisplayModal, postId, authorId }) {
  return (
    <div className="post__options__modal modal__background">
      <div className="option red__option">
        <h3>Report</h3>
      </div>
      <div
        className="option red__option"
        onClick={() => toogleDisplayModal("unfollow", postId, authorId)}
      >
        <h3>Unfollow</h3>
      </div>
      <div className="option black__option">
        <span>Add to favorites</span>
      </div>
      <div className="option black__option">
        <span>Go to post</span>
      </div>
      <div className="option black__option">
        <span>Share too...</span>
      </div>
      <div className="option black__option">
        <span>Copy link</span>
      </div>
      <div className="option black__option">
        <span>Embed</span>
      </div>
      <div className="option black__option">
        <span>About this account</span>
      </div>
      <div className="option" onClick={() => toogleDisplayModal(postId)}>
        <span>Cancel</span>
      </div>
    </div>
  );
}

export default PostOptionsModal;
