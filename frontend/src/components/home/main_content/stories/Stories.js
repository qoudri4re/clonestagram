import React, { useState } from "react";
import Story from "./Story";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

function Stories() {
  const [stories, setStories] = useState([
    {
      username: "python java",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "clonemaker",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "slackbot",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "mark izukabachuckwu",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "tollo romasi",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "tomato",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "javascript",
      profile_image: "demo_image",
      userID: "12",
    },
    {
      username: "pear",
      profile_image: "demo_image",
      userID: "1e",
    },
    {
      username: "django",
      profile_image: "demo_image",
      userID: "12",
    },
  ]);

  return (
    <div className="stories">
      <div className="arrow right__arrow">
        <FaAngleRight className="arrow__icon" />
      </div>
      <div className="arrow left__arrow">
        <FaAngleLeft className="arrow__icon" />
      </div>
      {stories.map((item) => {
        return (
          <Story
            key={uuidv4()}
            username={item.username}
            profile_image={item.profile_image}
            userID={item.userID}
          />
        );
      })}
    </div>
  );
}

export default Stories;
