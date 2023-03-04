import React from "react";
import elipses_icon from "../svgs/threeElipses.svg";

function SingleMessage({ senderOrReceiver }) {
  return (
    <div className={`single__message ${senderOrReceiver}`}>
      <div className="message__background">
        <div className="message">
          <p>Hi dddssssssssshellom jsjs</p>
        </div>
      </div>
      <div className="message__options">
        <img src={elipses_icon} alt="" />
      </div>
    </div>
  );
}

export default SingleMessage;
