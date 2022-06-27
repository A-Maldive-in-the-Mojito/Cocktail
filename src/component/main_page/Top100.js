import mainStyles from './Main.module.css'
import styles from '../Card.module.css'

import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; //좌우 화살표
import 'swiper/css/pagination'; //하단 이동 버튼
import 'swiper/css/autoplay'; //자동 넘기기
//contect
import { useContext } from 'react';
import { APIContext } from '../../context/APIContext';
import axios from "axios";


function Top100() {

    const API = useContext(APIContext)

    const TOP100 = API.filter(item => item.rank !== "no info")

    const randomArray = [];
    let n = 0
    while (n < 5) {
        const random = parseInt(Math.floor(Math.random() * 100));
        console.log(random)
        const random100 = TOP100[random]
        console.log(random100)
        randomArray.push(random100);
        n++
    }
    console.log(randomArray);



    const randomCocktail = (TOP100) => {
        console.log(randomArray)
        for (let num in randomArray) {
            console.log(num)
        }
    }


    // let swiper = new Swiper()
    let [slide, setSlide] = useState(mainStyles.slide)
    function changeSlideClass() {
        setSlide(mainStyles.active)
    }

    return (
        <div className={mainStyles.Top100}>
            <h1>World's Top 100
                <p>Cocktails</p></h1>

            {/* <Random /> */}

            <Swiper className={mainStyles.swiper}
                // install Swiper modules
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={40}
                // 한 번에 보여지는 개수
                slidesPerView={5}
                centeredSlides={'true'}
                grabCursor={'true'}
                // autoplay={{
                //     delay: 2000,
                //     disableOnInteraction: false,
                // }}
                navigation={true}
                pagination={{ clickable: true }}


                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div className={mainStyles.slider_wrapper}>
                    {/* <SwiperSlide>
                        {({ isActive }) => (
                            <div> {isActive ? changeSlideClass() : 'not active'}</div>
                            // classname 바꾸기
                        )}
                    </SwiperSlide> */}

                    {/* //맵 */}
                    {/* {randomArray.map(item=>
                        <SwiperSlide key={item._id.$oid} className={mainStyles.slide}>
                            <img src={item.S3_img}/>
                        </SwiperSlide>
                        )} */}
                    {randomArray[0] != undefined ? randomArray.map(item =>
                        <SwiperSlide className={mainStyles.slide}>
                            <img src={item.S3_img}/>
                        </SwiperSlide>
                    ) : <div></div>}


                    <SwiperSlide className={mainStyles.slide}>
                        <img src="https://cdn.diffords.com/contrib/stock-images/2015/12/06/2015bc30dbef6fb6d903330c18edf4af1463.jpg" />
                    </SwiperSlide>
                    <SwiperSlide className={mainStyles.slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                </div>

            </Swiper>



            <div className={mainStyles.more}>
                <span>+ Top 100 Cocktails 더보기</span>

            </div>
        </div>


    );
}
export default Top100;