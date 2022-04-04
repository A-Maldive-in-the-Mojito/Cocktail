import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'
import SearchIcon from '@mui/icons-material/Search';
import cardStyles from './Card.module.css'

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import $ from "jquery";

export default function Find() {

    const cocktail_api = useSelector((state) => state
    )
    useEffect(() => {
        console.log(cocktail_api)
    }, []);
    let imgurl = cocktail_api[0].img

   
    // function NewCard(){
    //     for (let i = 0; i < 10; i++) {
    //         let name_a = cocktail_api[i].name
    //         console.log(name_a)
    //         return <h2>{name_a}</h2>
    //     }
    // }
    



    return (
        <div>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div>
                    <h3>칵테일 이름이나 재료를 검색해보세요</h3>
                    <div className={Styles.search_box}>
                        <input className={Styles.search_input} type="text" />
                        <span className="btn-holder">
                            <SearchIcon></SearchIcon>
                            <button className="text-search-btn">찾기</button></span>
                    </div>
                </div>
                {/* 해시태그 */}
                <div>
                    <span id={Styles.TOP} className={Styles.hashtag}>#TOP 100🏆</span>
                    <span className={Styles.hashtag}>#홈파티🏡</span>
                    <span className={Styles.hashtag}>#발렌타인데이🍷</span>
                    <span className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    <span className={Styles.hashtag}>#데일리</span>
                    <span className={Styles.hashtag}>#해피뉴이어🎆</span>
                    <span className={Styles.hashtag}>#불금🌈</span>
                    <span className={Styles.hashtag}>#핫써머🏖️</span>
                    <span className={Styles.hashtag}>#HBD🎂</span>
                    <span className={Styles.hashtag}>#나를위한시️간🕯</span>
                    <span className={Styles.hashtag}>#무비나잇🎬</span>
                    <span className={Styles.hashtag}>#뜨밤🔥</span>

                </div>
            </div>
            {/* 하단 */}
            <div>
                <div>{cocktail_api.map(cocktail=> 
                    <div key={cocktail.id} className={cardStyles.imgContainer}>
                        <img className={cardStyles.imgCocktail} src={cocktail.img} /> 
                        <h3 className={cardStyles.cocktailName}>{cocktail.name}</h3>
                    </div>)}</div>

                <Link to="/desc">
                    <div className={appStyles.card}>
                        <img src={imgurl} />                        
                    </div>
                    <div id="temp_card"></div>
                    {/* <NewCard /> */}

                </Link>
            </div>

        </div>
    );
}