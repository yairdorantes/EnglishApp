import { useEffect } from "react";
import video from "../media/videos/video.mp4";
const Shorts = () => {
  const pauseVideo = (e) => {
    let video = e.target;
    video.paused ? video.play() : video.pause();
  };
  useEffect(() => {
    const video = document.querySelector(".video");
    video.loop = true;
  }, []);

  return (
    <div className="shorts-container">
      <div className="short-video">
        <video
          onClick={pauseVideo}
          autoPlay="autoplay"
          className="video"
          width="100%"
          height="100%"
          src={video}
        ></video>
      </div>
    </div>
  );
};

export default Shorts;
