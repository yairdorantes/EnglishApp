import React from "react";
import img from "../media/bg3.jpg";
import img2 from "../media/catch.jpg";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const Cards = () => {
  return (
    <>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={1}
        scrollbar={{ draggable: true }}

        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        <SwiperSlide>
          <div className="container-card">
            <div className="card">
              <figure>
                <img src={img} alt="" />
              </figure>
              <div className="contenido-card">
                <h3>Mushrooms</h3>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container-card">
            <div className="card">
              <figure>
                <img src={img2} alt="" />
              </figure>
              <div className="contenido-card">
                <h3>Catch</h3>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Cards;
