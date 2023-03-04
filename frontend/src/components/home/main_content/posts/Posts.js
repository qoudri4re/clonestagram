import React, { useEffect, useState } from "react";
import { client, requestHeaderConfig } from "../../../../axios";
import Post from "./Post";
import moment from "moment";

function Posts({
  userDetails,
  setUserDetails,
  toogleDisplayModal,
  setUpdateFeed,
  updateFeed,
  toogleDisplayPostModal,
}) {
  const [loading, setLoading] = useState(true);
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    if (updateFeed.update) {
      if (updateFeed.operation === "unfollow") {
        setFeed(
          feed.map((item) => {
            if (item.authorId === updateFeed.authorId) {
              return {
                ...item,
                followingAuthor: false,
              };
            }
            return item;
          })
        );
      } else if (updateFeed.operation === "post deleted") {
        setFeed(feed.filter((item) => item.postId !== updateFeed.postId));
      } else if (updateFeed.operation === "save or unsave post") {
        setFeed(
          feed.map((item) => {
            if (item.postId === updateFeed.postId) {
              return {
                ...item,
                savedPost: updateFeed.data,
              };
            }
            return item;
          })
        );
      } else if (updateFeed.operation === "like or unlike post") {
        setFeed(
          feed.map((item) => {
            if (item.postId === updateFeed.postId) {
              return {
                ...item,
                likes: updateFeed.data.likes,
                postLiked: updateFeed.data.postLiked,
              };
            }
            return item;
          })
        );
      } else if (updateFeed.operation === "comment deleted") {
        setFeed(
          feed.map((item) => {
            if (item.postId === updateFeed.postId) {
              let newComments = item.comments.filter(
                (commentItem) => commentItem.commentId !== updateFeed.commentId
              );
              return {
                ...item,
                comments: newComments,
              };
            }
            return item;
          })
        );
      } else if (updateFeed.operation === "new comment") {
        setFeed(
          feed.map((item) => {
            if (item.postId === updateFeed.postId) {
              return {
                ...item,
                comments: updateFeed.data.newComments,
              };
            }
            return item;
          })
        );
      }
      setUpdateFeed(false);
    }
  }, [updateFeed, feed, setUpdateFeed]);

  function follow(authorId) {
    client
      .post(
        "follow",
        {
          userToFollowId: authorId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("error" in res.data || "deletedUserTryingTofollow" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedUserToFollow" in res.data) {
          setFeed(feed.filter((item) => item.authorId !== authorId));
        } else if ("following" in res.data) {
          //impossible
        } else if ("serverError" in res.data) {
          //bottom message
        } else {
          setFeed(
            feed.map((item) => {
              if (item.authorId === authorId) {
                return {
                  ...item,
                  followingAuthor: true,
                };
              }
              return item;
            })
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
          postId: postId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("deletedPost" in res.data) {
          setFeed(feed.filter((item) => item.postId !== postId));
        } else if ("deletedUser" in res.data || "error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else {
          setFeed(
            feed.map((item) => {
              if (item.postId === postId) {
                return {
                  ...item,
                  savedPost: res.data.saved,
                };
              }
              return item;
            })
          );
        }
      });
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
            setFeed(feed.filter((item) => item.postId !== postId));
          } else {
            setFeed(
              feed.map((item) => {
                if (item.postId === postId) {
                  return {
                    ...item,
                    comments: res.data.newComments,
                  };
                }
                return item;
              })
            );
          }
        })
        .catch((err) => console.log(err));
    }
  }
  function like(postId) {
    client
      .post(
        "like",
        {
          postId: postId,
        },
        requestHeaderConfig(userDetails.jwtToken)
      )
      .then((res) => {
        if ("error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedUser" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else if ("deletedPost" in res.data) {
          setFeed(feed.filter((item) => item.postId !== postId));
        } else {
          setFeed(
            feed.map((item) => {
              if (item.postId === postId) {
                return {
                  ...item,
                  likes: res.data.likes,
                  postLiked: res.data.postLiked,
                };
              }
              return item;
            })
          );
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    client
      .get("feed", requestHeaderConfig(userDetails.jwtToken))
      .then((res) => {
        if ("error" in res.data) {
          localStorage.removeItem("userDetails");
          setUserDetails(null);
        } else {
          setLoading(false);
          setFeed(res.data.posts);
        }
      })
      .catch((err) => console.log(err));
  }, [userDetails, setUserDetails]);

  if (loading) {
    return <div>loader</div>;
  } else {
    return (
      <div className="posts">
        {feed.map((item) => {
          return (
            <Post
              key={item.postId}
              author={item.author}
              authorId={item.authorId}
              comments={item.comments}
              images={item.images}
              likes={item.likes}
              liked={item.postLiked}
              postId={item.postId}
              postImagesId={item.postImagesId}
              postText={item.postText}
              profileImage={item.profileImage}
              time={moment(new Date(item.time)).fromNow()}
              like={like}
              postComment={postComment}
              userId={userDetails.userId}
              toogleDisplayModal={toogleDisplayModal}
              savedPost={item.savedPost}
              savePost={savePost}
              followingAuthor={item.followingAuthor}
              follow={follow}
              toogleDisplayPostModal={toogleDisplayPostModal}
            />
          );
        })}
      </div>
    );
  }
}

export default Posts;
