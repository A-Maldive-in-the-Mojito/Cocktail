import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'
import SearchIcon from '@mui/icons-material/Search';
import cardStyles from './Card.module.css'
import Card from './Card';

import { Link } from 'react-router-dom';
import { useEffect, useState, useTransition } from "react";
// 리덕스
import { useSelector, connect } from 'react-redux';
// 리덕스 액션
import { getStore } from "../redux/getStore.js"
import axios from "axios";


//contect
import { useContext } from 'react';
import { APIContext } from '../context/APIContext';

const URL = 'http://localhost:5000'

function Find({ dispatchGetStore }) {
    // 칵테일 즐겨찾기 데이터 get
    // 이메일 가져오기
    const reduxState = useSelector(state => state);
    const email = reduxState.email.email

    const getMemberInfo = async (email) => {
        const response = await axios.get(`${URL}/login?email_give=${email}`);
        const memberInfo = JSON.parse(response.data.member_info);
        const storeCocktail = memberInfo[0].store
        console.log(storeCocktail);

        dispatchGetStore(storeCocktail);
    };

    useEffect(() => {
        getMemberInfo(email);
    }, [])


    const [a, setA] = useState(0);
    const [isPending, startTransition] = useTransition()
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
                    <h3>칵테일 이름 또는 재료를 검색해보세요</h3>
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


                </div>
            </div>

            {/* 하단 */}
            <div className={Styles.cardContainer}>
                {
                    (a == 1 ? hashArray : API).filter((val) => {
                        if (searchText == "") {
                            return val
                        } else if (val.name.toLowerCase().includes(searchText.toLowerCase())) {
                            return val
                        }
                    }).map((cocktail) =>
                    (<Card
                        key={cocktail._id.$oid}
                        id={cocktail._id.$oid}
                        img={cocktail.S3_img}
                        name={cocktail.name}
                    />                    
                    ))
                
                }
            </div>

        </div>
    );
}
function mapDispatchToProps(dispatch) {
    return {
        dispatchGetStore: array => dispatch(getStore(array))
    };
}

export default connect(null, mapDispatchToProps)(Find);