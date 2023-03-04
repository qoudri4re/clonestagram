import React from "react";
import Comments from "./allComments/Comments";

function postModal({
  postModal,
  toogleDisplayPostModal,
  toogleDisplayModal,
  postId,
  authorId,
  userDetails,
  setUserDetails,
  displayPostModal,
  makeFeedUpdate,
}) {
  if (postModal === "comments") {
    return (
      <div className="post__modal">
        <Comments
          toogleDisplayPostModal={toogleDisplayPostModal}
          toogleDisplayModal={toogleDisplayModal}
          postId={postId}
          authorId={authorId}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          displayPostModal={displayPostModal}
          makeFeedUpdate={makeFeedUpdate}
        />
      </div>
    );
  }
}
export default postModal;
