import React, { useState } from "react";
import "./sidebar.css";
import SidebarWithoutOverlay from "./SidebarWithoutOverlay";
import SidebarWithOverlay from "./SidebarWithOverlay";

function Sidebar({ where }) {
  const [displaySearchOverLay, setDisplaySearhOverlay] = useState(false);
  const [displayNotificationOverLay, setDisplayNotificationOverLay] =
    useState(false);
  const [displayMoreOverlay, setDisplayMoreOverlay] = useState(false);
  function displayOrHideSearch() {
    setDisplaySearhOverlay(!displaySearchOverLay);
    if (displayNotificationOverLay) {
      setDisplayNotificationOverLay(false);
    }
    if (displayMoreOverlay) setDisplayMoreOverlay(false);
  }

  function displayOrHideNotification() {
    setDisplayNotificationOverLay(!displayNotificationOverLay);
    if (displaySearchOverLay) {
      setDisplaySearhOverlay(false);
    }
    if (displayMoreOverlay) setDisplayMoreOverlay(false);
  }

  function displayOrHideMore() {
    setDisplayMoreOverlay(!displayMoreOverlay);
    if (displaySearchOverLay) setDisplaySearhOverlay(false);
    if (displayNotificationOverLay) setDisplayNotificationOverLay(false);
  }

  if (displaySearchOverLay) {
    return (
      <div className="sidebar">
        <SidebarWithOverlay
          displayOrHideSearch={displayOrHideSearch}
          displayOrHideNotification={displayOrHideNotification}
          overlay="search"
          where={where}
          displayOrHideMore={displayOrHideMore}
          displayMoreOverlay={displayMoreOverlay}
        />
      </div>
    );
  } else if (displayNotificationOverLay) {
    return (
      <div className="sidebar">
        <SidebarWithOverlay
          displayOrHideSearch={displayOrHideSearch}
          displayOrHideNotification={displayOrHideNotification}
          overlay="notifications"
          where={where}
          displayOrHideMore={displayOrHideMore}
          displayMoreOverlay={displayMoreOverlay}
        />
      </div>
    );
  } else if (displayMoreOverlay) {
    return (
      <div className="sidebar">
        <SidebarWithoutOverlay
          displayOrHideSearch={displayOrHideSearch}
          displayOrHideNotification={displayOrHideNotification}
          displayOrHideMore={displayOrHideMore}
          displayMoreOverlay={displayMoreOverlay}
          where={where}
        />
      </div>
    );
  } else {
    return (
      <div className="sidebar">
        <SidebarWithoutOverlay
          displayOrHideSearch={displayOrHideSearch}
          displayOrHideNotification={displayOrHideNotification}
          where={where}
          displayOrHideMore={displayOrHideMore}
          displayMoreOverlay={displayMoreOverlay}
        />
      </div>
    );
  }
}

export default Sidebar;
