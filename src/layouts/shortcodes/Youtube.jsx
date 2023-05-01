import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

const Youtube = ({ id, title, ...rest }) => {
  return (
    <LiteYouTubeEmbed
      id={id}
      title={title}
      {...rest}
      wrapperClass="yt-lite rounded-md"
    />
  );
};

export default Youtube;
