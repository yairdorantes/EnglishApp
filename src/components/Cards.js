import React, { useEffect, useState } from "react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import wordSound from "../media/cards/audio.png";
import { useSpeechSynthesis } from "react-speech-kit";

const Cards = () => {
  const { speak } = useSpeechSynthesis();
  const text = "nigger motherfucker";

  let url = "http://127.0.0.1:8000/api/cards/";
  const [isActive, setIsActive] = useState(true);
  const [cards, setCards] = useState();

  const fetchAPi = async () => {
    const response = await fetch(url);
    const responseJSON = await response.json();
    setCards(responseJSON);
    console.log(responseJSON);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  const handleDisplay = (e) => {
    isActive ? setIsActive(false) : setIsActive(true);
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        loop={true}
      >
        {!cards
          ? console.log("cargando")
          : cards.cards.map((card, key) => {
              return (
                <SwiperSlide key={card.id}>
                  <div className="container-card">
                    <div className="card">
                      <figure>
                        <img src={card.imageURL} alt="" />
                      </figure>
                      <div className="contenido-card">
                        <img
                          onClick={() => speak({ text: card.cardTitle })}
                          className="word-sound"
                          src={wordSound}
                          alt=""
                        />
                        <h3 onClick={handleDisplay} className="active">
                          {isActive ? card.cardTitle : card.cardMeaning}
                        </h3>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </>
  );
};

export default Cards;
