import perro from "../media/audio/dog.mp3";
const Listening = () => {
  return (
    <>
      <div className="container-audio">
        <audio className="player" src={perro} controls></audio>
        <div className="bg-img"></div>
      </div>
    </>
  );
};

export default Listening;
