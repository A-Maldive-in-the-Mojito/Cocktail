import mainStyles from "./Main.module.css";
import styles from "../Card.module.css";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; //좌우 화살표
import "swiper/css/pagination"; //하단 이동 버튼
import "swiper/css/autoplay"; //자동 넘기기
//contect
import { useContext } from "react";
import { APIContext } from "../../context/APIContext";
import axios from "axios";

function Top100() {
  const API = useContext(APIContext);

  const TOP100 = API.filter((item) => item.rank !== "no info");

  const randomArray = [];
  const reallOnlyArray = [];


  function Random() {
    let n = 0;
    while (n < 10) {
      const randomNum = Math.floor(Math.random() * 100);
      //랜덤칵테일 배열에 넣기
      const random100 = TOP100[randomNum];
      console.log(random100);
      randomArray.push(random100);
      n = n+1;
    }
    RemoveSame()
  }

  function RemoveSame() {
    const removeDuplicate = Array.from(new Set(randomArray));
    for(let i=0; i<5; i++){
      reallOnlyArray.push(removeDuplicate[i])
    }
    console.log(reallOnlyArray)
  }
  //랜덤함수 실행
  Random();

  let [slide, setSlide] = useState(mainStyles.slide);
  function changeSlideClass() {
    setSlide(mainStyles.active);
  }

  return (
    <div className={mainStyles.Top100}>
      <h1>
        World's Top 100
        <p>Cocktails</p>
      </h1>

      {/* <Random /> */}

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        // 슬라이드 간 여백
        spaceBetween={200}
        // 한 번에 보여지는 개수
        slidesPerView={5}
        centeredSlides={"true"}
        grabCursor={"true"}
        // autoplay={{
        //     delay: 2000,
        //     disableOnInteraction: false,
        // }}
        navigation={true}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="swiper-container">
          {reallOnlyArray[0] != undefined ? (
            reallOnlyArray.map((item) => (
              <SwiperSlide key={item.name} className={mainStyles.slide}>
                <Link to={`/desc:${item._id.$oid}`}>
                  <img   src={item.S3_img} />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <div><h2>WE'RE GOING TO SHOW"</h2>"</div>
          )}
        </div>
      </Swiper>

      <div className={mainStyles.more}>
        <span>+ Top 100 Cocktails 더보기</span>
      </div>
    </div>
  );
}
export default Top100;