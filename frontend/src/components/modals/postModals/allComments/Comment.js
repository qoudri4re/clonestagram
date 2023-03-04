import React, { useState } from "react";
import smallLikeIcon from "../../../svgs/smallLikeIcon.svg";
import smallLikedIcon from "../../../svgs/smallLikedIcon.svg";
import horizontalElipsisIcon from "../../../svgs/horizontalElipsis.svg";
import demo_image from "../../../../demo_image.png";

function Comment({
  postText,
  text,
  author,
  time,
  profileImage,
  likes,
  likeComment,
  commentId,
  liked,
  toogleDisplayModal,
}) {
  const [displayElipsis, setDisplayElipsis] = useState(false);

  return (
    <div
      className={`single__comment ${postText ? "post__text" : ""}`}
      onMouseEnter={() => setDisplayElipsis(true)}
      onMouseLeave={() => setDisplayElipsis(false)}
    >
      <div className="single__comment__left">
        <div className="single__comment__inner__left">
          <div className="image__background">
            <img
              src={profileImage === "default" ? demo_image : profileImage}
              alt=""
            />
          </div>
        </div>
        <div className="single__comment__inner__right">
          <div className="username__and__comment">
            <p>
              <span className="username">{author} </span> {text}
            </p>
          </div>
          <div className="single__comment__bottom">
            {postText ? (
              <span>{time}</span>
            ) : (
              <>
                <span>{time}</span>
                {likes ? (
                  <span>
                    {likes === 1 ? `${likes} like` : `${likes} likes`}
                  </span>
                ) : (
                  ""
                )}

                <span className="reply__button"> Reply</span>
              </>
            )}

            {postText ? (
              ""
            ) : (
              <div
                className={`image__background ${
                  displayElipsis ? "" : "dont__display"
                }`}
              >
                <img
                  src={horizontalElipsisIcon}
                  alt=""
                  onClick={() =>
                    toogleDisplayModal("report comment", null, null, commentId)
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
      {postText ? (
        ""
      ) : (
        <div className="single__comment__right">
          <img
            src={liked ? smallLikedIcon : smallLikeIcon}
            alt=""
            onClick={() => likeComment(commentId)}
          />
        </div>
      )}
    </div>
  );
}

export default Comment;
