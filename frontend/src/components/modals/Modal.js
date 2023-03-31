import React from "react";
import "./modals.css";
import PostOptionsModal from "./PostOptionsModal";
import UnfollowModal from "./UnfollowModal";
import ReportComment from "./postModals/ReportComment";
import CreatePost from "./CreatePost";

function Modal({
  modal,
  postId,
  authorId,
  userDetails,
  commentId,
  setUserDetails,
  toogleDisplayModal,
  makeFeedUpdate,
}) {
  if (modal === "post options") {
    return (
      <div className="modal">
        <PostOptionsModal
          toogleDisplayModal={toogleDisplayModal}
          postId={postId}
          authorId={authorId}
        />
      </div>
    );
  } else if (modal === "unfollow") {
    return (
      <div className="modal">
        <UnfollowModal
          toogleDisplayModal={toogleDisplayModal}
          postId={postId}
          authorId={authorId}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          makeFeedUpdate={makeFeedUpdate}
        />
      </div>
    );
  } else if (modal === "report comment") {
    return (
      <div className="modal">
        <ReportComment
          commentId={commentId}
          toogleDisplayModal={toogleDisplayModal}
        />
      </div>
    );
  } else if (modal === "create post") {
    return (
      <div className="modal">
        <CreatePost />
      </div>
    );
  }
}

export default Modal;
