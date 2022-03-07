import mainStyles from './Main.module.css'
import styles from '../Card.module.css'

import {useState} from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Navigation, Pagination, Autoplay } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation'; //좌우 화살표
import 'swiper/css/pagination'; //하단 이동 버튼
import 'swiper/css/autoplay'; //자동 넘기기


export default function Top100() {
    // let swiper = new Swiper()
    let [slide, setSlide] = useState(mainStyles.slide)
    function changeSlideClass() {
        setSlide(mainStyles.active)
    }

    return (
        <div className={mainStyles.Top100}>
            <h1>World's Top 100
            <p>Cocktails</p></h1>

            <Swiper className={mainStyles.swiper}
                // install Swiper modules
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={40}
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
                    <SwiperSlide className={slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                    <SwiperSlide className={slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                    <SwiperSlide className={mainStyles.slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                    <SwiperSlide className={mainStyles.slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                    <SwiperSlide className={mainStyles.slide}>
                        <img src="https://images.cocktailflow.com/v1/cocktail/w_300,h_540/cocktail_mango_lime_virgin_margarita-1.png" />
                    </SwiperSlide>
                </div>

            </Swiper>
            <div className={mainStyles.more}>
                + Top 100 Cocktails 더보기
            </div>
        </div>


    );
}