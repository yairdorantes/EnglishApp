import { useEffect } from "react";
let video = "https://youtu.be/1tS5RhCId4o";
const Shorts = () => {
  return (
    <div className="shorts-container">
      <div className="short-video">
        <iframe
          width={"100%"}
          height={"100%"}
          src={
            "https://www.dailymotion.com/embed/video/x3i8zd4?autoplay=1&queue-autoplay-next=0&queue-enable=1&sharing-enable=0&ui-logo=0&ui-start-screen-info=0&loop=1"
          }
          frameBorder={"0"}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        />
      </div>
    </div>
  );
};

export default Shorts;
