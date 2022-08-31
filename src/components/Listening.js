import perro from "../media/audio/dog.mp3";
import AudioPlayer from "react-h5-audio-player";

const Listening = () => {
  return (
    <>
      <div className="container-audio">
        <AudioPlayer
          className="player"
          autoPlay
          src={perro}
          onPlay={(e) => {
            console.log("oonplay");
          }}
        ></AudioPlayer>
        <div className="bg-img"></div>
      </div>
    </>
  );
};

export default Listening;
