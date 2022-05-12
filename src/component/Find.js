import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'
import SearchIcon from '@mui/icons-material/Search';
import cardStyles from './Card.module.css'
import Card from './Card';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

//contect
import { useContext } from 'react';
import { APIContext } from '../context/APIContext';


function Find() {
    const [a, setA] = useState(0);

    // 리덕스
    // const cocktail_api = useSelector((state) => state
    // )
 

    //context API받기
    const API = useContext(APIContext);


    //해시태그Array
    const [hashArray, setHashArray] = useState([])
    console.log(hashArray);

    const onClick = (event) => {
        const ID = event.target.id

        for (var i = 0; i < 4; i++) {
            const findHash0 = API.filter(item => item.hashtag[0] === ID)
            const findHash1 = API.filter(item => item.hashtag[1] === ID)
            const findHash2 = API.filter(item => item.hashtag[2] === ID)
            const findHash3 = API.filter(item => item.hashtag[3] === ID)
            // 노가다로 합치기~~!
            const allHash = findHash0.concat(findHash1).concat(findHash2).concat(findHash3)

            setHashArray(allHash);
            // console.log(allHash)
        }
        setA(1);
    }

    //검색기능
    const [searchText, setSearchText] = useState("");
    const onChange = (event) => {
        setSearchText(event.target.value);
        // console.log(searchText);
    };

    //검색창 비우기
    const onSubmit = (event) => {
        event.preventDefault();
        setSearchText("");
    };


    return (
        <div className={Styles.Find}>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div className={Styles.search_space}>
                    <h3>칵테일 이름이나 재료를 검색해보세요</h3>
                    <form onSubmit={onSubmit} className={Styles.search_box}>
                        <input onChange={onChange} className={Styles.search_input} type="text" value={searchText} />
                        <i ><SearchIcon className={Styles.search_btn} /></i>
                    </form>
                </div>
                {/* 해시태그 */}
                <div className={Styles.tags_box}>
                    <label>
                        <input type="checkbox" onClick={onClick} id="top100" className={Styles.cBox} />
                        <span className={`${Styles.TOP} ${Styles.hashtag}`}>#TOP 100🏆</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="house-party" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#홈파티🏡</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="allseason-classics" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#데일리</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="christmas" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="movie-nights" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#무비나잇🎬</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="new-years-eve" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#해피뉴이어🎆</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="downtown" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#불금🌈</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="birthday" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#HBD🎂</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="time-for-you" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#나를위한시️간🕯</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="valentines-day" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#발렌타인데이🍷</span>
                    </label>
                    <label>
                        <input type="checkbox" onClick={onClick} id="anniversary" className={Styles.cBox} />
                        <span className={Styles.hashtag}>#뜨밤🔥</span>
                    </label>

                    {/* <input  onClick={onClick} id="house-party" className={Styles.hashtag}>#홈파티🏡</input>
                    <span onClick={onClick} id="allseason-classics" className={Styles.hashtag}>#데일리</span>
                    <span onClick={onClick} id="christmas" className={Styles.hashtag}>#산타랑_건배🎅🏻</span>
                    <span onClick={onClick} id="movie-nights" className={Styles.hashtag}>#무비나잇🎬</span>
                    <span onClick={onClick} id="new-years-eve" className={Styles.hashtag}>#해피뉴이어🎆</span>
                    <span onClick={onClick} id="downtown" className={Styles.hashtag}>#불금🌈</span>
                    <span className={Styles.hashtag}>#핫써머🏖️</span>
                    <span onClick={onClick} id="birthday" className={Styles.hashtag}>#HBD🎂</span>
                    <span onClick={onClick} id="time-for-you" className={Styles.hashtag}>#나를위한시️간🕯</span>
                    <span onClick={onClick} id="valentines-day" className={Styles.hashtag}>#발렌타인데이🍷</span>
                    <span onClick={onClick} id="anniversary" className={Styles.hashtag}>#뜨밤🔥</span> */}

                </div>
            </div>
            
            {/* 하단 */}
            <div className={Styles.cardContainer}>
                {(a == 1 ? hashArray : API).filter((val) => {
                    if (searchText == "") {
                        return val
                    } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
                        return val
                    }
                }).map((cocktail) =>
                (<Card
                    key={cocktail._id.$oid}
                    id={cocktail._id.$oid}
                    img={cocktail.img}
                    name={cocktail.name}
                />
                ))}
            </div>

        </div>
    );
}
export default Find;