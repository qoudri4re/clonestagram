import React, { useEffect, useState } from "react";
import "../../modals.css";
import cancel_icon from "../../../svgs/whiteCancelIcon.svg";
import demo_image from "../../../../demo_image.png";
import demo_image2 from "../../../../demo_image2.jpg";
import demo_image3 from "../../../../demo_image3.jpg";
import elipsis from "../../../svgs/threeElipses.svg";
import like_icon from "../../../svgs/like.svg";
import liked_icon from "../../../svgs/liked.svg";
import comment_icon from "../../../svgs/comment.svg";
import share_icon from "../../../svgs/messages.svg";
import save_icon from "../../../svgs/save.svg";
import saved_icon from "../../../svgs/saved.svg";
import emoji_icon from "../../../svgs/emoji.svg";
import Comment from "./Comment";
import { client, requestHeaderConfig } from "../../../../axios";
import moment from "moment";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

function Comments({
  toogleDisplayPostModal,
  toogleDisplayModal,
  postId,
  authorId,
  userDetails,
  makeFeedUpdate,
  setUserDetails,
  displayPostModal,
}) {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([
    demo_image,
    demo_image2,
    demo_image3,
  ]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  function handleTyping(e) {
    setComment(e.target.value);
  }

  function handleClick() {
    postComment(comment, postId);
    setComment("");
  }

  function postComment(comment, postId) {
    if (comment !== "") {
      client
        .post(
          "comment",
          {
            postId: postId,
            comment: comment,
          },
          requestHeaderConfig(userDetails.jwtToken)
        )
        .then((res) => {
          if ("error" in res.data) {
            localStorage.removeItem("userDetails");
            setUserDetails(null);
          } else if ("deletedPost" in res.data) {
            toogleDisplayPostModal();
            makeFeedUpdate(true, "post deleted", null, postId);
          } else {
            setPost({
              ...post,
              comments: res.data.newComments,
            });
            makeFeedUpdate(true, "new comment", null, postId, null, res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function likeComment(commentId) {
    client
      .post(
        "likeComment",
        { commentId },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("error" in res.data || "deletedUser" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedComment" in res.data) {
          setPost({
            ...post,
            comments: post.comments.filter(
              (item) => item.commentId !== commentId
            ),
          });
          makeFeedUpdate(true, "comment deleted", null, postId, commentId);
          //modal that says comment deleted
        } else {
          setPost({
            ...post,
            comments: post.comments.map((item) => {
              if (item.commentId === commentId) {
                return {
                  ...item,
                  commentLikes: res.data.commentData,
                  liked: res.data.liked,
                };
              }
              return item;
            }),
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function like(postId) {
    client
      .post(
        "like",
        {
          postId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedUser" in res.data) {
          //impossible, the user liking a post has deactivated
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedPost" in res.data) {
          makeFeedUpdate(true, "post deleted", null, postId);
        } else {
          setPost({
            ...post,
            likes: res.data.likes,
            postLiked: res.data.postLiked,
          });
          //feed needs to be updated
          makeFeedUpdate(
            true,
            "like or unlike post",
            null,
            postId,
            null,
            res.data
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function savePost(postId) {
    client
      .post(
        "savePost",
        {
          postId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("deletedPost" in res.data) {
          toogleDisplayPostModal();
          //updates the feed contents by removing the deleted post
          makeFeedUpdate(true, "post deleted", null, postId);
        } else if ("deletedUser" in res.data || "error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else {
          setPost({
            ...post,
            savedPost: res.data.saved,
          });
          makeFeedUpdate(
            true,
            "save or unsave post",
            null,
            postId,
            null,
            res.data.saved
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (displayPostModal.display) {
      setLoading(true);
      client
        .get(`viewPost/${postId}`, requestHeaderConfig(userDetails.jwtToken), {
          params: { postId },
        })
        .then((res) => {
          if ("error" in res.data) {
            setLoading(false);
            localStorage.removeItem("userDetails");
            setUserDetails(null);
          } else {
            setPost(res.data.postData);
            //setPostImages(res.data.postData.postImages) later
            setLoading(false);
          }
        })
        .catch((err) => {
          //error modal
          setLoading(false);
          console.log(err);
        });
    }
  }, [displayPostModal.display, postId, setUserDetails, userDetails.jwtToken]);

  return (
    <>
      <div className="comments__content">
        {post ? (
          <>
            <div className="comments__left">
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
              <div className="image__background">
                <img src={postImages[currentImageIndex]} alt="" />
              </div>
            </div>
            <div className="comments__right">
              <div className="comment__header">
                <div className="comment__header__left">
                  <div className="image__background">
                    <img src={demo_image} alt="" />
                  </div>
                  <div className="details">
                    <h4>{post.author}</h4>
                    <span>Location</span>
                  </div>
                </div>
                <div className="comment__header__right">
                  <img
                    src={elipsis}
                    alt=""
                    onClick={() =>
                      toogleDisplayModal("post options", postId, authorId)
                    }
                  />
                </div>
              </div>
              <div className="all__comments">
                <Comment
                  postText={true}
                  text={post.postText}
                  author={post.author}
                  time={moment(new Date(post.time)).fromNow()}
                  profileImage={post.profileImage}
                  likes={post.likes.length}
                />
                {post.comments.map((item) => {
                  return (
                    <Comment
                      key={item.commentId}
                      commentId={item.commentId}
                      text={item.comment}
                      profileImage={item.profileImage}
                      time={moment(new Date(item.time)).fromNow()}
                      likes={item.commentLikes.length}
                      author={item.author}
                      likeComment={likeComment}
                      liked={item.liked}
                      toogleDisplayModal={toogleDisplayModal}
                    />
                  );
                })}
              </div>
              <div className="comments__footer">
                <div className="comments__footer__header">
                  <div className="comments__footer__header__left">
                    <img
                      src={post.postLiked ? liked_icon : like_icon}
                      alt=""
                      onClick={() => like(postId)}
                    />
                    <img src={comment_icon} alt="" />
                    <img src={share_icon} alt="" />
                  </div>
                  <div className="comments__footer__header__right">
                    <img
                      src={post.savedPost ? saved_icon : save_icon}
                      alt=""
                      onClick={() => savePost(postId)}
                    />
                  </div>
                </div>
                <div className="all__comments__post__details">
                  <div className="all__comments__post__details__likes">
                    {post.likes.length ? (
                      post.likes.length === 1 ? (
                        <span>{post.likes.length} like</span>
                      ) : (
                        <span>{post.likes.length} likes</span>
                      )
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="all__comments__post__details__date__posted">
                    <span>{moment(new Date(post.time)).fromNow()}</span>
                  </div>
                </div>
                <div className="all__comments__post__comment">
                  <div className="emoji__background">
                    <img src={emoji_icon} alt="" />
                  </div>
                  <textarea
                    placeholder="Add a comment..."
                    onChange={handleTyping}
                    value={comment}
                  ></textarea>
                  <button onClick={handleClick}>Post</button>
                </div>
              </div>
            </div>{" "}
          </>
        ) : (
          "loader"
        )}
      </div>
      <div className="cancel__icon">
        <img src={cancel_icon} alt="" onClick={toogleDisplayPostModal} />
      </div>
    </>
  );
}

export default Comments;
