import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'
import SearchIcon from '@mui/icons-material/Search';
import cardStyles from './Card.module.css'
import Card from './Card';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";


function Find() {

    const cocktail_api = useSelector((state) => state
    )
    useEffect(() => {
        console.log(cocktail_api)
    }, []);


    return (
        <div>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div>
                    <h3>칵테일 이름이나 재료를 검색해보세요</h3>
                    <div className={Styles.search_box}>
                        <input className={Styles.search_input} type="text" />
                        <i ><SearchIcon className={Styles.search_btn}/></i> 
                    </div>
                </div>
                {/* 해시태그 */}
                <div className={Styles.tags_box}>
                    <span className={`${Styles.TOP} ${Styles.hashtag}`}>#TOP 100🏆</span>
                    <span className={Styles.hashtag}>#홈파티🏡</span>
                    <span className={Styles.hashtag}>#데일리</span>
                    <span className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    <span className={Styles.hashtag}>#무비나잇🎬</span>
                    <span className={Styles.hashtag}>#해피뉴이어🎆</span>
                    <span className={Styles.hashtag}>#불금🌈</span>
                    <span className={Styles.hashtag}>#핫써머🏖️</span>
                    <span className={Styles.hashtag}>#HBD🎂</span>
                    <span className={Styles.hashtag}>#나를위한시️간🕯</span>
                    <span className={Styles.hashtag}>#발렌타인데이🍷</span>
                    <span className={Styles.hashtag}>#뜨밤🔥</span>

                </div>
            </div>
            {/* 하단 */}
            <div>
                {cocktail_api.map((cocktail) => 
                (<Card
                    key={cocktail._id.$oid} 
                    id={cocktail._id.$oid}
                    img={cocktail.img} 
                    name={cocktail.name}
                />
                ))}

                <Link to="/desc">
                    

                </Link>
            </div>

        </div>
    );
}
export default Find;