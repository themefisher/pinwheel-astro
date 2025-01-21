import React from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({ id, title, ...rest }) => {
  return (
    <LiteYouTubeEmbed
      wrapperClass="yt-lite rounded-md"
      id={id}
      title={title}
      {...rest}
    />
  );
};

export default Youtube;
