import React, { useState } from "react";
import Sidebar from "../home/sidebar/Sidebar";
import "./messages.css";
import arrow_icon from "../svgs/angleArrow.svg";
import MessageInaCircle_icon from "../svgs/messageInACirle.svg";
import composeMessage_icon from "../svgs/composeMessageIcon.svg";
import ChatListItem from "./ChatListItem";
import { v4 as uuidv4 } from "uuid";
import ChatArea from "./ChatArea";
import ChatDetails from "./ChatDetails";

function Messages() {
  const [displayChatDetails, setDisplayChatDetails] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  function handleChatClick() {
    setCurrentChat("placeholder");
  }
  function hideOrShowDetails() {
    setDisplayChatDetails(!displayChatDetails);
  }
  return (
    <div className="messages">
      <Sidebar where="messages" />
      <div className="messages__container">
        <div className="messages__content">
          <div className="left__content">
            <div className="left__content__header">
              <div className="left__header__item">
                <div className="username__switch">
                  <div className="username__switch__content">
                    <h3>Username</h3>
                    <img src={arrow_icon} alt="" />
                  </div>
                </div>
              </div>
              <div className="right__header__item">
                <img src={composeMessage_icon} alt="" />
              </div>
            </div>
            <div className="message__items">
              <ChatListItem key={uuidv4()} handleChatClick={handleChatClick} />
              <ChatListItem key={uuidv4()} handleChatClick={handleChatClick} />
              <ChatListItem key={uuidv4()} handleChatClick={handleChatClick} />
            </div>
          </div>
          <div className="right__content">
            {currentChat ? (
              displayChatDetails ? (
                <ChatDetails hideOrShowDetails={hideOrShowDetails} />
              ) : (
                <ChatArea hideOrShowDetails={hideOrShowDetails} />
              )
            ) : (
              <div className="no__chat__selected">
                <div className="no__chat__selected__content">
                  <img src={MessageInaCircle_icon} alt="" />
                  <p>Your Messages</p>
                  <span>
                    Send private photos and messages to a friend or group.
                  </span>
                  <button>Send Message</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
