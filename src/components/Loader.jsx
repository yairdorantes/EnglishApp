import "./styles/Loader.css";
const Loader = ({ pos }) => {
  // console.log(styles);
  return (
    <>
      <div className={`flex justify-center ${pos}`}>
        <div className="loader-wrapper-1">
          <div className="loader-1">
            <div className="loader-1 loader-inner-1"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
