import React from "react";
import { client, requestHeaderConfig } from "../../axios";
import demo_image from "../../demo_image2.jpg";

function UnfollowModal({
  toogleDisplayModal,
  postId,
  authorId,
  userDetails,
  setUserDetails,
  makeFeedUpdate,
}) {
  function unfollow() {
    client
      .post(
        "unfollow",
        {
          userToUnfollowId: authorId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedUserToUnfollow" in res.data) {
        } else if ("deletedUserTryingToUnfollow" in res.data) {
          //impossible
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("serverError" in res.data) {
          //the down overlay should display
        } else if ("notFollowing" in res.data) {
        } else {
          makeFeedUpdate(true, "unfollow", authorId);
          toogleDisplayModal();
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="unfollow__modal modal__background">
      <div className="info">
        <div className="image__background">
          <img src={demo_image} alt="" />
        </div>
        <span>Unfollow this guy?</span>
      </div>
      <div className="option red__option" onClick={unfollow}>
        <span>Unfollow</span>
      </div>
      <div className="option black__option" onClick={toogleDisplayModal}>
        <span>Cancel</span>
      </div>
    </div>
  );
}

export default UnfollowModal;
