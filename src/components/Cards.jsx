import { useContext, useEffect, useRef, useState } from "react";
import "./styles/cardStyles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import "./styles/stylesCards.css";
import {
  Pagination,
  EffectCards,
  Mousewheel,
  Keyboard,
  Autoplay,
  EffectFlip,
  EffectCube,
} from "swiper";
import iconAdd from "../media/add.png";
import Loader from "./Loader";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import mySite from "./Domain";
import axios from "axios";
import NewMenu from "./NewMenu";
import FormCard2 from "./FormCard2";
let url = "";
const Cards = () => {
  let { user } = useContext(AuthContext);
  const [cardData, setCardData] = useState({
    cardTitle: "",
    cardMeaning: "",
    image: "",
  });

  const navigate = useNavigate();
  const audioRef = useRef();
  const paramsUrl = useParams();
  const [audio, setAudio] = useState();
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [loader, setLoader] = useState(false);
  // const [IsAutoSlide, setIsAutoSlide] = useState(true);
  const [swiperState, setSwiperState] = useState(() =>
    localStorage.getItem("swiper-state")
      ? JSON.parse(localStorage.getItem("swiper-state"))
      : { effect: "cards" }
  );

  const fetchAPi = () => {
    setLoader(true);
    paramsUrl.section === "mis-cartas"
      ? (url = `${mySite}usercards/${user.user_id}`)
      : (url = `${mySite}cards/${paramsUrl.section}`);
    axios.get(url).then((res) => {
      setCards(res.data.cards);
    });
  };
  useEffect(() => {
    fetchAPi();
  }, []);

  const handleDisplay = () => setIsActive(!isActive);

  const handleAudio = (sound) => {
    // const audio = ;
    setAudio(`data:audio/mpeg;base64,${sound}`);
    audioRef.current.play();
  };

  const changeSwiper = () => {
    if (swiperState.effect === "cards") {
      localStorage.setItem(
        "swiper-state",
        JSON.stringify({ effect: "navigation" })
      );
    } else {
      localStorage.setItem("swiper-state", JSON.stringify({ effect: "cards" }));
    }
    location.reload();
  };

  return (
    <>
      <NewMenu />

      <div className="all-cards">
        <div className="flex gap-3 justify-center ">
          <button className="btn" onClick={changeSwiper}>
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
            >
              <path
                fill="currentColor"
                d="M4.993 11.016a1 1 0 01-.531-1.848L7.15 6.48a1 1 0 011.414 1.415l-1.121 1.12h7.55a1 1 0 010 2h-10zM19.007 12.984a1 1 0 01.531 1.848L16.85 17.52a1 1 0 11-1.414-1.415l1.121-1.12h-7.55a1 1 0 110-2h10z"
              />
            </svg>
          </button>

          <Link to={"/learned"}>
            <button className="btn btn-info">
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="1em"
                width="1em"
                className="w-6 h-6"
              >
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </Link>
          {paramsUrl.section === "mis-cartas" && (
            <div className="del-cards">
              <NavLink to="/cards/modify">
                <button className="btn btn-warning ">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1em"
                    // className="w-8 h-8"
                    width="1em"
                  >
                    <path d="M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" />
                  </svg>
                </button>
              </NavLink>
            </div>
          )}
        </div>
        <Swiper
          keyboard={true}
          mousewheel={true}
          className={`relative ${
            swiperState.effect === "cards"
              ? "w-[270px] h-[400px] mt-24"
              : "p-10 h-[400px] w-[400px]"
          }  `}
          loop
          effect={swiperState.effect}
          spaceBetween={50}
          // autoplay={
          //   IsAutoSlide && {
          //     delay: 500,
          //     disableOnInteraction: false,
          //   }
          // }
          modules={[
            EffectCards,
            EffectFlip,
            Mousewheel,
            Pagination,
            Keyboard,
            Autoplay,
            EffectCube,
          ]}
        >
          {/* <CardTuto></CardTuto> */}
          {cards && cards && cards.length === 0 && <div>Nada aqui</div>}
          {!cards ? (
            <Loader pos={"-mt-28"} />
          ) : (
            cards.map((card) => {
              // console.log(cards);
              return (
                <SwiperSlide
                  // onChange={() => console.log(card)}
                  style={{
                    borderColor: "white",
                    backgroundImage: "url(" + card.image + ")",
                  }}
                  className="swiper-slide-card"
                  key={card.id}
                >
                  <div className="container-card">
                    <div className="card">
                      <div className="contenido-card">
                        <h3 onClick={handleDisplay} className="card-text">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                      </div>
                    </div>
                    <button
                      className="btn-sound-card"
                      onClick={() => {
                        handleAudio(card.cardSound);
                      }}
                    >
                      {/* // TODO check how works on mobile  */}
                      <svg
                        viewBox="0 0 500 1000"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        className="w-6 h-6"
                      >
                        <path d="M486 474c9.333 6.667 14 15.333 14 26 0 9.333-4.667 17.333-14 24L58 790c-16 10.667-29.667 12.667-41 6-11.333-6.667-17-20-17-40V242c0-20 5.667-33.333 17-40 11.333-6.667 25-4.667 41 6l428 266" />
                      </svg>
                      {/* <img className="word-sound" src={wordSound} alt="" /> */}
                    </button>
                  </div>
                </SwiperSlide>
              );
            })
          )}
          <audio autoPlay src={audio} ref={audioRef} />
        </Swiper>
        {paramsUrl.section === "mis-cartas" && (
          <div className="container-icon-add">
            <img
              onClick={() => setModalIsOpen(!modalIsOpen)}
              className="icon-add mx-auto"
              src={iconAdd}
              alt=""
            />
          </div>
        )}
        <div className="cont-btn-review flex justify-center flex-col gap-5 items-center">
          <button
            onClick={() =>
              navigate("/test", {
                state: {
                  cards: cards,
                  section:
                    paramsUrl.section === "mis-cartas"
                      ? "Mis cartas"
                      : paramsUrl.section,
                },
              })
            }
            className="btn bg-blue-700 w-36"
          >
            Quiz
          </button>
        </div>
        <FormCard2
          isOpen={modalIsOpen}
          setCardData={setCardData}
          cardData={cardData}
          handleOpen={setModalIsOpen}
          cards={cards}
          setCards={setCards}
        />
        {/* {cards && !cards.length > 0 && (
          <div>Para generar un quiz agrega tus cartas </div>
        )} */}
      </div>
    </>
  );
};

export default Cards;
