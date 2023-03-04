import React from "react";
import Stories from "./stories/Stories";
import Posts from "./posts/Posts";
import AccountAndSuggestions from "./account_and_suggestions/AccountAndSuggestions";
import "./main_content.css";

function MainContent({
  userDetails,
  setUserDetails,
  toogleDisplayModal,
  setUpdateFeed,
  updateFeed,
  toogleDisplayPostModal,
}) {
  return (
    <div className="main__content">
      <div className="left">
        <Stories />
        <Posts
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          toogleDisplayModal={toogleDisplayModal}
          updateFeed={updateFeed}
          setUpdateFeed={setUpdateFeed}
          toogleDisplayPostModal={toogleDisplayPostModal}
        />
      </div>
      <div className="right">
        <AccountAndSuggestions username={userDetails.username} />
      </div>
    </div>
  );
}

export default MainContent;
