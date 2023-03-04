import React from "react";
import call_icon from "../svgs/callIcon.svg";
import videoCall_icon from "../svgs/videoCallIcon.svg";
import details_icon from "../svgs/detailsIcon.svg";
import demo_image from "../../demo_image.png";
import TimeStamp from "./TimeStamp";
import SingleMessage from "./SingleMessage";
import emoji_icon from "../svgs/emoji.svg";
import picture__icon from "../svgs/pictureIcon.svg";
import like_icon from "../svgs/like.svg";

function ChatArea({ hideOrShowDetails }) {
  return (
    <div className="chat__area">
      <div className="chat__area__header">
        <div className="chat__area__header__left">
          <div className="image__background">
            <img src={demo_image} alt="" />
          </div>
          <h3>username here</h3>
        </div>
        <div className="chat__area__header__right">
          <img src={call_icon} alt="" />
          <img src={videoCall_icon} alt="" />
          <img src={details_icon} alt="" onClick={hideOrShowDetails} />
        </div>
      </div>
      <div className="chat__messages">
        <TimeStamp />
        <SingleMessage senderOrReceiver="reciever" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="reciever" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="reciever" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
        <SingleMessage senderOrReceiver="sender" />
      </div>
      <div className="send__message">
        <div className="send__message__content">
          <div className="send__message__left">
            <div className="image__background">
              <img src={emoji_icon} alt="" />
            </div>
            <textarea placeholder="Message..."></textarea>
          </div>
          <div className="send__message__right">
            <img src={picture__icon} alt="" />
            <img src={like_icon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
