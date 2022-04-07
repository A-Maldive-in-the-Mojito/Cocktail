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
    // useEffect(() => {
    //     console.log(cocktail_api)
    // }, []);
    
    //해시태그Array
    const [hashArray, setHashArray] = useState([])
    console.log(hashArray)

    const onClick = (event) => {
        const ID = event.target.id

        for (var i = 0; i < 4; i++) {
            const findHash0 = cocktail_api.filter(item => item.hashtag[0] === ID)
            const findHash1 = cocktail_api.filter(item => item.hashtag[1] === ID)
            const findHash2 = cocktail_api.filter(item => item.hashtag[2] === ID)
            const findHash3 = cocktail_api.filter(item => item.hashtag[3] === ID)
            // 노가다로 합치기~~!
            const allHash = findHash0.concat(findHash1).concat(findHash2).concat(findHash3)
        
            setHashArray(allHash);
 
            console.log(allHash)
        }
    }



    return (
        <div>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div>
                    <h3>칵테일 이름이나 재료를 검색해보세요</h3>
                    <div className={Styles.search_box}>
                        <input className={Styles.search_input} type="text" />
                        <i ><SearchIcon className={Styles.search_btn} /></i>
                    </div>
                </div>
                {/* 해시태그 */}
                <div className={Styles.tags_box}>
                    <button onClick={onClick} id="top100" className={`${Styles.TOP} ${Styles.hashtag}`} >#TOP 100🏆</button>
                    <span onClick={onClick} id="house-party" className={Styles.hashtag}>#홈파티🏡</span>
                    <span onClick={onClick} id="allseason-classics" className={Styles.hashtag}>#데일리</span>
                    <span onClick={onClick} id="christmas" className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    <span onClick={onClick} id="movie-nights" className={Styles.hashtag}>#무비나잇🎬</span>
                    <span onClick={onClick} id="new-years-eve" className={Styles.hashtag}>#해피뉴이어🎆</span>
                    <span onClick={onClick} id="downtown" className={Styles.hashtag}>#불금🌈</span>
                    <span className={Styles.hashtag}>#핫써머🏖️</span>
                    <span onClick={onClick} id="birthday" className={Styles.hashtag}>#HBD🎂</span>
                    <span onClick={onClick} id="time-for-you" className={Styles.hashtag}>#나를위한시️간🕯</span>
                    <span onClick={onClick} id="valentines-day" className={Styles.hashtag}>#발렌타인데이🍷</span>
                    <span onClick={onClick} id="anniversary" className={Styles.hashtag}>#뜨밤🔥</span>

                </div>
            </div>
            {/* 하단 */}
            <div>
                
                {/* 모든카드 보기 
                {cocktail_api.map((cocktail) =>
                (<Card
                    key={cocktail._id.$oid}
                    id={cocktail._id.$oid}
                    img={cocktail.img}
                    name={cocktail.name}
                />
                ))} */}
                
                {/* 해시태그 검색 */}
                {hashArray.map((cocktail) =>
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