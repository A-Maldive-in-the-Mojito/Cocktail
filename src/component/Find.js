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

    const [finding, setFinding] = useState([])
    console.log(finding)

    const onClick = (event) => {
        const ID = event.target.id


        // 해시태그 배열
        // const hashtags = cocktail_api.map(item => item.hashtag)
        for (var i = 0; i < 4; i++) {
            const findHas = cocktail_api.filter(item => item.hashtag[i] === ID)
            setFinding(current => [findHas, ...current]);
            // const findID = finding.map(item => item._id.$oid)
            console.log(findHas)


            // const HasCard = () => {
            //     finding.map(item =>
            //         <Card
            //             id={item._id.$oid}
            //             img={item.img}
            //             name={item.name}

            //         />)
            // }
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
                {/* {cocktail_api.map((cocktail) =>
                (<Card
                    key={cocktail._id.$oid}
                    id={cocktail._id.$oid}
                    img={cocktail.img}
                    name={cocktail.name}
                />
                ))} */}

                {finding.map((cocktail) =>
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