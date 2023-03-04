import React, { useState } from "react";
import threeElipses_icon from "../../../svgs//threeElipses.svg";
import like_icon from "../../../svgs//like.svg";
import liked_icon from "../../../svgs/liked.svg";
import comment_icon from "../../../svgs/comment.svg";
import share_icon from "../../../svgs/messages.svg";
import save_icon from "../../../svgs//save.svg";
import saved_icon from "../../../svgs/saved.svg";
import emoji_icon from "../../../svgs/emoji.svg";
import demo_image from "../../../../demo_image.png";
import demo_image2 from "../../../../demo_image2.jpg";
import demo_image3 from "../../../../demo_image3.jpg";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function Post({
  postId,
  author,
  authorId,
  comments,
  images,
  likes,
  postImagesId,
  postText,
  profileImage,
  time,
  like,
  postComment,
  userId,
  toogleDisplayModal,
  savedPost,
  savePost,
  followingAuthor,
  follow,
  toogleDisplayPostModal,
  liked,
}) {
  const [postImages, setPostImages] = useState([
    demo_image,
    demo_image2,
    demo_image3,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [comment, setComment] = useState("");
  const [showLess, setShowLess] = useState(true);

  function toogleShowLess() {
    setShowLess(!showLess);
  }
  function handleTyping(e) {
    setComment(e.target.value);
  }

  function handleClick() {
    postComment(comment, postId);
    setComment("");
  }

  function nextImage() {
    if (currentImageIndex === postImages.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  }

  function previousImage() {
    if (currentImageIndex === 0) {
      setCurrentImageIndex(postImages.length - 1);
    } else {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  }
  return (
    <div className="post">
      <div className="post__header">
        <div
          className={`post__header__left ${
            followingAuthor ? "" : "post__header__left__with__follow"
          }`}
        >
          <div className="post__header__left__left">
            <div className="image__background">
              <img src={demo_image} alt="" />
            </div>
          </div>
          <div className="post__header__left__right">
            <h3>{author}</h3>
            {followingAuthor ? (
              ""
            ) : (
              <>
                <span>•</span>
                <span
                  className="follow__button"
                  onClick={() => follow(authorId)}
                >
                  Follow
                </span>
              </>
            )}
          </div>
        </div>
        <div className="post__header__right">
          <img
            src={threeElipses_icon}
            alt=""
            onClick={() => toogleDisplayModal("post options", postId, authorId)}
          />
        </div>
      </div>
      <div className="post__body">
        {postImages.length > 1 ? (
          currentImageIndex === 0 ? (
            <div className="arrow right__arrow" onClick={nextImage}>
              <FaAngleRight className="arrow__icon" />
            </div>
          ) : currentImageIndex === postImages.length - 1 ? (
            <div className="arrow left__arrow" onClick={previousImage}>
              <FaAngleLeft className="arrow__icon" />
            </div>
          ) : currentImageIndex !== 0 &&
            currentImageIndex !== postImages.length - 1 ? (
            <>
              <div className="arrow left__arrow" onClick={previousImage}>
                <FaAngleLeft className="arrow__icon" />
              </div>
              <div className="arrow right__arrow" onClick={nextImage}>
                <FaAngleRight className="arrow__icon" />
              </div>
            </>
          ) : (
            <div className="arrow right__arrow" onClick={nextImage}>
              <FaAngleRight className="arrow__icon" />
            </div>
          )
        ) : (
          ""
        )}

        <div className="post__image__background">
          <img src={postImages[currentImageIndex]} alt="" />
        </div>
      </div>
      <div className="post__details">
        <div className="post__details__header">
          <div className="post__details__header__left">
            <img
              src={liked ? liked_icon : like_icon}
              alt=""
              className="icon"
              onClick={() => like(postId)}
            />
            <img src={comment_icon} alt="" className="icon" />
            <img src={share_icon} alt="" className="icon" />
          </div>
          <div className="post__details__header__right">
            <img
              src={savedPost ? saved_icon : save_icon}
              alt=""
              className="icon"
              onClick={() => savePost(postId)}
            />
          </div>
        </div>
        <div className="details">
          <div className="likes">
            {likes.length ? (
              likes.length === 1 ? (
                <h3>{likes.length} like</h3>
              ) : (
                <h3>{likes.length} likes</h3>
              )
            ) : (
              ""
            )}
          </div>
          <div className="post__text">
            {showLess ? (
              postText.length + author.length > 43 ? (
                <p>
                  <strong>{author}</strong>{" "}
                  {postText.substring(0, 40 - author.length)}...
                  <span className="more" onClick={toogleShowLess}>
                    {" "}
                    more
                  </span>
                </p>
              ) : (
                <p>
                  <strong>{author}</strong> {postText}
                </p>
              )
            ) : (
              <p>
                <strong>{author}</strong> {postText}
                <span className="more" onClick={toogleShowLess}>
                  {" "}
                  {showLess ? "more" : "showless"}
                </span>
              </p>
            )}
          </div>
          {comments.length ? (
            comments.length > 1 ? (
              <p
                className="show__comments"
                onClick={() =>
                  toogleDisplayPostModal("comments", authorId, postId)
                }
              >
                View all {comments.length} comments
              </p>
            ) : (
              <p
                className="show__comments"
                onClick={() =>
                  toogleDisplayPostModal("comments", authorId, postId)
                }
              >
                View {comments.length} comment
              </p>
            )
          ) : (
            ""
          )}
          <p className="time__posted">{time}</p>

          <div className="comment__field">
            <div className="comment__field__left">
              <img src={emoji_icon} alt="" />
              <textarea
                placeholder="Add a comment..."
                onChange={handleTyping}
                value={comment}
              ></textarea>
            </div>
            <div className="comment__field__right">
              <button onClick={handleClick}>Post</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
