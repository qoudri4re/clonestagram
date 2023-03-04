import React from "react";
import settings_icon from "../../svgs/settingsIcon.svg";
import saved_icon from "../../svgs/save.svg";
import report_icon from "../../svgs/reportAproblemIcon.svg";

function More() {
  return (
    <div className="more">
      <div className="more__item">
        <div className="more__item__left">
          <span>settings</span>
        </div>
        <div className="more__item__right">
          <img src={settings_icon} alt="" />
        </div>
      </div>
      <div className="more__item">
        <div className="more__item__left">
          <span>Saved</span>
        </div>
        <div className="more__item__right">
          <img src={saved_icon} alt="" />
        </div>
      </div>
      <div className="more__item no__border">
        <div className="more__item__left">
          <span>Report a problem</span>
        </div>
        <div className="more__item__right">
          <img src={report_icon} alt="" />
        </div>
      </div>
      <div className="more__item__account">
        <div className="more__item__account__item">
          <div>
            <span>Switch accounts</span>
          </div>
        </div>
        <div className="more__item__account__item no__border">
          <div>
            <span>Log out</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
