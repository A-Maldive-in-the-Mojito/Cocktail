import appStyles from '../App.module.css' // ../은 상위폴더
import Styles from './Find.module.css'
import SearchIcon from '@mui/icons-material/Search';
import Card from './Card';

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// 리덕스
import { useSelector, connect } from 'react-redux';
// 리덕스 액션
import { getStore } from "../redux/getStore.js"
import axios from "axios";


//contect
import { useContext } from 'react';
import { APIContext } from '../context/APIContext';

const URL = 'http://localhost:5000'

function Find() {
    const { linkTop100 } = useParams();
    
    // context API받기
    const API = useContext(APIContext);
    
    const [able, setable]= useState("")
    // API GET
    const getCocktails = async () => {
        const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
        const cocktails = JSON.parse(all_cocktails)
        setable(cocktails)
    }

//해시태그Array
const [hashArray, setHashArray] = useState([])
const getHashElements = document.getElementsByName("check")

//top100을 통해 들어왔을 때 실행되는 함수
function top100Check() {
    if(linkTop100 == ":1"){
    getHashElements[0].click()
    }
}
useEffect(() => {top100Check()}, [])

//해시태그가 바뀔때마다 api를 불러옴.
useEffect(() => {getCocktails()}, [hashArray])



// 해시태그 checked 판별
const getHash = Array.prototype.slice.call(getHashElements);

const hashTagTrueFalseArray = []
getHash.map(val => hashTagTrueFalseArray.push(val.checked))


const onChangeCheckbox = (event) => {
    const hashValue = event.target.value
    for (let tag of getHash) {
        if (tag.value != hashValue) {
            tag.checked = false
        } 
    }

    for (var i = 0; i < 4; i++) {
        const findHash0 = API.filter(item => item.hashtag[0] === hashValue);
        const findHash1 = API.filter(item => item.hashtag[1] === hashValue);
        const findHash2 = API.filter(item => item.hashtag[2] === hashValue);
        const findHash3 = API.filter(item => item.hashtag[3] === hashValue);
        // 노가다로 합치기~~!
        const allHash = findHash0.concat(findHash1).concat(findHash2).concat(findHash3)

        setHashArray(allHash);
    }
}

    //검색기능
    const [searchText, setSearchText] = useState("");
    const onChange = (event) => {
        setSearchText(event.target.value);
    };

    //검색어 입력 후 엔터 시 검색창 비우기
    const onSubmit = (event) => {
        event.preventDefault();
        let submitted = event.target[1].value;
        setSearchText(submitted);
        event.target[1].value = ""
    };    
    
    //해쉬태그 안에 들어갈 텍스트 배열
    const hashTagArray = [
        {
            "name": "#TOP 100🏆",
            "value": "top100",
            "key": 1
        },
        {
            "name": "#홈파티🏡",
            "value": "house-party",
            "key": 2
        },
        {
            "name": "#데일리",
            "value": "allseason-classics",
            "key": 3
        },
        {
            "name": "#산타랑_건배🎅🏻",
            "value": "christmas",
            "key": 4
        },
        {
            "name": "#무비나잇🎬",
            "value": "movie-nights",
            "key": 5
        },

        {
            "name": "#해피뉴이어🎆",
            "value": "new-years-eve",
            "key": 6
        },
        {
            "name": "#불금🌈",
            "value": "downtown",
            "key": 7
        },
        {
            "name": "#HBD🎂",
            "value": "birthday",
            "key": 8
        },
        {
            "name": "#나를위한시️간🕯",
            "value": "time-for-you",
            "key": 9
        },
        {
            "name": "#발렌타인데이🍷",
            "value": "valentines-day",
            "key": 10
        },
        {
            "name": "#뜨밤🔥",
            "value": "anniversary",
            "key": 11
        },

    ]
    //이름 & 재료 검색 값 확인 함수
    const [selectValue, setSelectValue] = useState("name");
    const selectOnChange = (event) =>{
        setSelectValue(event.target.value);
    };

    return (
        <div className={Styles.Find}>
            {/* 상단 */}
            <div>
                {/* 검색창 */}
                <div className={Styles.search_space}>
                    <h3>칵테일 이름 또는 재료를 검색해보세요</h3>
                    <form onSubmit={onSubmit} className={Styles.search_box}>
                        <div className={Styles.inputSearchBox}>
                            <div className='select'>
                                <select onChange={selectOnChange}>
                                    <option value="name">이름검색</option>
                                    <option value="ingredient">재료검색</option>
                                </select>
                            </div>
                            <input  className={Styles.search_input} onChange={onChange} type="text" value={searchText} />
                            <i ><SearchIcon className={Styles.search_btn} /></i>
                        </div>
                    </form>
                </div>

                {/* 해시태그 */}
                <div className={Styles.tags_box}>
                    {hashTagArray.map(val =>
                        <label>
                            <input type="checkbox" name="check" onChange={onChangeCheckbox} value={val.value} className={Styles.cBox} />
                            <span className={
                                (val.value == "top100" ? `${Styles.TOP} ${Styles.hashtag}` : Styles.hashtag)
                            }>{val.name}</span>
                        </label>
                    )}
                </div>
            </div>

            {/* 하단 */}
            <div className={Styles.cardContainer}>
                {
                    (hashTagTrueFalseArray.includes(true) ? hashArray : API).filter((val) => {
                        if (searchText == "") {
                            return val
                        } else if (selectValue == "name" && val.name.toLowerCase().includes(searchText.toLowerCase())) {
                                    // console.log(val)
                                return val
                        } else if ( selectValue == "ingredient" &&
                            val.ingredients.map(val => val["재료"].toLowerCase().includes(searchText.toLowerCase())).includes(true)
                        ) {
                            // console.log(val)
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
export default Find;