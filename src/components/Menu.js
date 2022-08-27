import cards from "../media/cards.png";
import listen from "../media/listening2.png";
import video from "../media/video.png";
import note from "../media/note.png";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <>
      <div className="bg-menu">
        <div className="welcome-text">Secciones de práctica</div>
        <div className="container-menu">
          <div>
            <Link to="/cards" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={cards} alt="" />
                  </div>
                  <div className="container-name-section">Cards</div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/listening" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu2">
                    <img className="img-learning-section" src={listen} alt="" />
                  </div>
                  <div className="container-name-section">Listening</div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/exercises" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={note} alt="" />
                  </div>
                  <div className="container-name-section"> Exercises</div>
                </div>
              </div>
            </Link>
          </div>

          <div>
            <Link to="/shorts" className="link">
              <div className="square-background">
                <div className="container-data-menu-option">
                  <div className="container-img-menu">
                    <img className="img-learning-section" src={video} alt="" />
                  </div>
                  <div className="container-name-section">Videos</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
