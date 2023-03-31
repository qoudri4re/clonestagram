import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import "./home.css";
import MainContent from "./main_content/MainContent";
import { retrieveUserDetailsFromLocalStorage } from "../../utils/functions";
import { useNavigate } from "react-router-dom";
import Modal from "../modals/Modal";
import PostModal from "../modals/postModals/PostModal";

function Home() {
  let navigate = useNavigate();
  const [updateFeed, setUpdateFeed] = useState({
    update: false,
    operation: null,
    authorId: null,
  });
  const [userDetails, setUserDetails] = useState(
    retrieveUserDetailsFromLocalStorage()
  );
  const [displayModal, setDisplayModal] = useState({
    modal: "",
    display: false,
    postId: null,
    authorId: null,
  });
  const [displayPostModal, setDisplayPostModal] = useState({
    modal: "",
    display: false,
    authorId: null,
    postId: null,
  });

  useEffect(() => {
    if (!userDetails) navigate("/login");
  }, [navigate, userDetails]);

  function toogleDisplayModal(
    modal = "",
    postId = null,
    authorId = null,
    commentId = null
  ) {
    setDisplayModal({
      modal: modal,
      display: modal === "" ? false : true,
      postId: postId,
      authorId: authorId,
      commentId,
    });
  }

  function toogleDisplayPostModal(modal = "", authorId, postId) {
    setDisplayPostModal({
      modal: modal,
      display: modal === "" ? false : true,
      authorId: authorId,
      postId: postId,
    });
  }

  function makeFeedUpdate(
    update,
    operation = null,
    authorId = null,
    postId = null,
    commentId = null,
    data = null
  ) {
    setUpdateFeed({
      update: update,
      operation: operation,
      authorId: authorId,
      postId,
      commentId,
      data,
    });
  }
  if (userDetails) {
    return (
      <div className="home">
        <Sidebar where="home" toogleDisplayModal={toogleDisplayModal} />
        <MainContent
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          toogleDisplayModal={toogleDisplayModal}
          updateFeed={updateFeed}
          setUpdateFeed={setUpdateFeed}
          toogleDisplayPostModal={toogleDisplayPostModal}
        />
        {displayModal.display ? (
          <Modal
            toogleDisplayModal={toogleDisplayModal}
            modal={displayModal.modal}
            postId={displayModal.postId}
            authorId={displayModal.authorId}
            commentId={displayModal.commentId}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            makeFeedUpdate={makeFeedUpdate}
          />
        ) : (
          ""
        )}
        {displayPostModal.display ? (
          <PostModal
            postModal={displayPostModal.modal}
            toogleDisplayPostModal={toogleDisplayPostModal}
            toogleDisplayModal={toogleDisplayModal}
            postId={displayPostModal.postId}
            authorId={displayPostModal.authorId}
            userDetails={userDetails}
            setUserDetails={setUserDetails}
            displayPostModal={displayPostModal}
            makeFeedUpdate={makeFeedUpdate}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Home;
