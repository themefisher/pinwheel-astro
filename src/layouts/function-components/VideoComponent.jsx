import { useState } from "react";
import YouTube from "react-youtube";

const VideoComponent = ({
  height,
  width,
  src,
  title,
  video_id,
  video_height,
  video_width,
}) => {
  const [play, setPlay] = useState(false);
  const videoOptions = {
    borderRadius: "16px",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <>
      {!play ? (
        <div className="relative text-center">
          <button className="video-play-btn" onClick={() => setPlay(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
          <img
            width={width}
            height={height}
            src={src}
            alt={title}
            className="inline h-auto max-w-full rounded-2xl"
          />
        </div>
      ) : (
        <div className="youtube mx-auto text-center">
          <YouTube
            videoId={video_id}
            opts={videoOptions}
            iframeClassName={`  aspect-video ${video_height} ${video_width} max-w-full bg-transparent rounded-2xl`}
          />
        </div>
      )}
    </>
  );
};

export default VideoComponent;
