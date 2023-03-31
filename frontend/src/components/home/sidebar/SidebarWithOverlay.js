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
import clonetagram_icon from "../../svgs/clonestagramIcon.svg";
import Search from "./Search";
import Notifications from "./Notifications";
import { Link } from "react-router-dom";
import More from "./More";

function SidebarWithOverlay({
  displayOrHideSearch,
  displayOrHideNotification,
  overlay,
  displayMoreOverlay,
  displayOrHideMore,
  where,
  toogleDisplayModal,
}) {
  return (
    <div className="sidebar__with__overlay">
      <div className="logo sidebar__top">
        <img className="cursor__pointer" src={clonetagram_icon} alt="" />
      </div>
      <div className="navigations sidebar__bottom">
        <div className="item">
          <Link to="/">
            <img src={where === "home" ? home_icon_on : home_icon_off} alt="" />
          </Link>
        </div>
        <div
          className={`item ${overlay === "search" ? "circle__icon" : ""}`}
          onClick={displayOrHideSearch}
        >
          <img src={search_icon} alt="" />
        </div>
        <div className="item">
          <img src={explore_icon} alt="" />
        </div>
        <div className="item">
          <Link to="/messages">
            <img src={messages_icon} alt="" />
          </Link>
        </div>
        <div
          className={`item ${
            overlay === "notifications" ? "circle__icon" : ""
          }`}
          onClick={displayOrHideNotification}
        >
          <img src={notification_icon} alt="" />
        </div>
        <div className="item" onClick={() => toogleDisplayModal("create post")}>
          <img src={create_icon} alt="" />
        </div>
        <div className="item profile__picture">
          <div className="image__container">
            <img src={demo_image} alt="" />
          </div>
        </div>
        {displayMoreOverlay ? (
          <div className="more__container">
            <p>dddd</p>
          </div>
        ) : (
          ""
        )}
        <div className="item" onClick={displayOrHideMore}>
          <img src={more_icon} alt="" />
        </div>
      </div>
      <div className="overlay">
        {overlay === "search" ? <Search /> : <Notifications />}
      </div>
    </div>
  );
}

export default SidebarWithOverlay;
