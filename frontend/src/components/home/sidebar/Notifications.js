import React from "react";
import NotificationIcon from "../../svgs/notifications.svg";
import NotificationSuggestion from "./NotificationSuggestion";

function Notifications() {
  return (
    <div className="notifications overlay__item">
      <div className="header">
        <h2>Notifications</h2>
      </div>
      <div className="explanation">
        <div className="icon__background">
          <div className="image__background">
            <img src={NotificationIcon} alt="" />
          </div>
        </div>
        <span>Activity On Your Posts</span>
        <span>
          When someone likes or comments on one of your posts, you'll see it
          here.
        </span>
      </div>
      <div className="notification__suggestions">
        <div className="suggestion__header">
          <h3>Suggestions For You</h3>
        </div>
        <NotificationSuggestion />
        <NotificationSuggestion />
        <NotificationSuggestion />
        <NotificationSuggestion />
        <NotificationSuggestion />
        <NotificationSuggestion />
      </div>
    </div>
  );
}

export default Notifications;
