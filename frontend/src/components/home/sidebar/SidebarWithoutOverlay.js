import React from "react";
import home_icon_on from "../../svgs/home.svg";
import home_icon_off from "../../svgs/homeOff.svg";
import create_icon from "../../svgs/create.svg";
import explore_icon from "../../svgs/explore.svg";
import messages_icon from "../../svgs/messages.svg";
import search_icon from "../../svgs/search.svg";
import notification_icon from "../../svgs/notifications.svg";
import more_icon from "../../svgs/more.svg";
import demo_image from "../../../demo_image.png";
import { Link } from "react-router-dom";
import More from "./More";

function SidebarWithoutOverlay({
  displayOrHideSearch,
  displayOrHideNotification,
  displayOrHideMore,
  where,
  displayMoreOverlay,
  toogleDisplayModal,
}) {
  return (
    <>
      <div className="logo sidebar__top">
        <h3 className="cursor__pointer">Clonestagram</h3>
      </div>
      <div className="navigations sidebar__bottom">
        <div className="item">
          <Link to="/">
            <img src={where === "home" ? home_icon_on : home_icon_off} alt="" />
            <p className={where === "home" ? "current__nav" : ""}>Home</p>
          </Link>
        </div>
        <div className="item" onClick={displayOrHideSearch}>
          <img src={search_icon} alt="" />
          <p className={where === "search" ? "current__nav" : ""}>Search</p>
        </div>
        <div className="item">
          <img src={explore_icon} alt="" />
          <p className={where === "explore" ? "current__nav" : ""}>Explore</p>
        </div>
        <div className="item">
          <Link to="/messages" className="nav__link">
            <img src={messages_icon} alt="" />
            <p className={where === "messages" ? "current__nav" : ""}>
              Messages
            </p>
          </Link>
        </div>
        <div className="item" onClick={displayOrHideNotification}>
          <img src={notification_icon} alt="" />
          <p className={where === "notifications" ? "current__nav" : ""}>
            Notifications
          </p>
        </div>
        <div className="item" onClick={() => toogleDisplayModal("create post")}>
          <img src={create_icon} alt="" />
          <p className={where === "create" ? "current__nav" : ""}>Create</p>
        </div>
        <div className="item profile__picture">
          <div className="image__container">
            <img src={demo_image} alt="" />
          </div>
          <p>Profile</p>
        </div>
        {displayMoreOverlay ? (
          <div className="more__container">
            <More />
          </div>
        ) : (
          ""
        )}

        <div className="item" onClick={displayOrHideMore}>
          <img src={more_icon} alt="" />
          <p className={displayMoreOverlay ? "current__nav" : ""}>More</p>
        </div>
      </div>
    </>
  );
}

export default SidebarWithoutOverlay;
