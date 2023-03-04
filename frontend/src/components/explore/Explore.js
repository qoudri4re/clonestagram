import React from "react";
import Sidebar from "../home/sidebar/Sidebar";
import "./explore.css";
import ExploreItem from "./ExploreItem";

function Explore() {
  return (
    <div className="explore">
      <Sidebar where="explore" />
      <div className="explore__content">
        <div className="explore__items">
          <ExploreItem type="image" />
          <ExploreItem type="image" />
          <ExploreItem type="video" />
          <ExploreItem type="image" />
        </div>
        <div className="footer">
          <span>about</span>
          <span>about</span>
          <span>about</span>
          <span>about</span>
        </div>
      </div>
    </div>
  );
}

export default Explore;
