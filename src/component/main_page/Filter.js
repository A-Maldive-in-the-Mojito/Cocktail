import * as React from "react";
// import appStyles from '../../App.module.css'
import mainStyles from "./Main.module.css";
import Card from "../Card.js";

import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";

import { useContext, useEffect, useState, useRef } from "react";
import { APIContext } from "../../context/APIContext";
import { event } from "jquery";


function Filter() {
  //  const cocktail_api = useSelector((state) => state)
  const API = useContext(APIContext);

  //리덕스 스토어에 이모지 가져오기
  const reduxState = useSelector((state) => state);
  const emoji = reduxState.emoji;
  // const emoji_url = emoji.filter((item) => item["name"].includes("Desert Island"))[0].url
  
  const booziness1 = emoji.filter((item) => item["value"].includes("booziness1"))[0].url
  const booziness3 = emoji.filter((item) => item["value"].includes("booziness3"))[0].url
  const booziness5 = emoji.filter((item) => item["value"].includes("booziness5"))[0].url
  console.log(booziness1);

  const sweetness1 = emoji.filter((item) => item["value"].includes("sweetness1"))[0].url
  const sweetness3 = emoji.filter((item) => item["name"].includes("Wine Glass"))[0].url
  const sweetness5 = emoji.filter((item) => item["value"].includes("sweetness5"))[0].url
  

  const tastingNoteList = [
    {
      name: "과일",
      value: "프루티"
    },
    {
      name: "허브",
      value: "허브"
    },
    {
      name: "아이셔",
      value: "아이셔"
    },
    {
      name: "아이써",
      value: "아이써"
    },
    {
      name: "프레시",
      value: "프레시"
    },
  ]

  const baseList = [
    {
      name: "진",
      value: "gin"
    },
    {
      name: "럼",
      value: "rum"
    },
    {
      name: "위스키",
      value: "whiskey"
    },
    {
      name: "데킬라",
      value: "tequila"
    },
    {
      name: "보드카",
      value: "vodka"
    },
    {
      name: "브랜디",
      value: "brandy"
    },
  ]

  // const returnEmoji = (find_emoji) => {
  //   return (
  //     <img src={find_emoji} />
  //   )
  // }

  const alcoholMarks = [
    {
      value: 1,
      label: (<div className={mainStyles.slider_label}><img src={booziness1} /> <p>사람구실은 <p>해야지</p></p></div>),
    },
    {
      value: 3,
      label: (<div className={mainStyles.slider_label}><img src={booziness3} /> <p>오스트랄로피테쿠스 <p>입니다</p></p></div>),
    },
    {
      value: 5,
      label: (<div className={mainStyles.slider_label}><img src={booziness5} /> <p>멍멍</p></div>),
    },
  ];

  const dryMarks = [
    {
      value: 1,
      label: (<div className={mainStyles.slider_label}><img src={sweetness1} /> <p>달달함에 잠겨 <p>죽고싶다</p></p></div>),
    },
    {
      value: 3,
      label: (<div className={mainStyles.slider_label}><img src={sweetness3} /> <p>달콤쌉싸름</p></div>),
    },
    {
      value: 5,
      label: (<div className={mainStyles.slider_label}><img src={sweetness5} /> <p>인생보다<p>쓴맛으로</p></p></div>),
    },
  ];

  const SliderStyle = styled(Slider)({
    color: "#ff9924",
    height: 6,
    //고정
    '&.Mui-disabled': {
      color: '#fe900f'
    },

    // 단추
    "& .MuiSlider-thumb": {
      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
        boxShadow: "inherit",
      },
    },

    // 밸류값 태그
    "& .MuiSlider-valueLabel": {
      lineHeight: 1.3,
      fontSize: 12,
      background: "unset",
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: "50% 50% 50% 0",
      backgroundColor: "#ff9924",
      transformOrigin: "bottom left",
      transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
      "&:before": { display: "none" },
      "&.MuiSlider-valueLabelOpen": {
        transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
      },
      "& > *": {
        transform: "rotate(45deg)",
      },
    },
    // 라벨 이모티콘 사이즈
    "& .MuiSlider-markLabel": {
      fontSize: "25px",
      marginTop: "5px",
    },
  });

  // 테이스팅 값
  // useRef
  const tastingValue = useRef([]);
  const tastingOnChange = (event) => {
    const eventValue = event.target.value;
    const checked = event.target.checked;
    //useRef에 저장
    checked
      ? (tastingValue.current = [eventValue, ...tastingValue.current])
      : (tastingValue.current = tastingValue.current.filter(
        (val) => val != eventValue
      ));
  };

  // 베이스 값
  const baseValue = useRef([]);
  const baseOnChange = (event) => {
    const eventValue = event.target.value;
    const baseChecked = event.target.checked;
    baseChecked
      ? (baseValue.current = [eventValue, ...baseValue.current])
      : (baseValue.current = baseValue.current.filter(
        (val) => val != eventValue
      ));
  };

  // 얼마나 취할래 값
  const [currentBoozy, setCurrentBoozy] = useState();//검색버튼클릭시 지정해둔 값으로 고정하기 위함.
  const boozyValue = useRef(10);
  const boozyOnChange = (event) => {
    const parseBoozyValue = parseInt(event.target.value);
    boozyValue.current = parseBoozyValue * 2;
    setCurrentBoozy(parseBoozyValue);
  };

  // sweet or dry 값
  const [currentSweet, setCurrentSweet] = useState();//검색버튼클릭시 지정해둔 값으로 고정하기 위함.
  const sweetValue = useRef(6);
  const sweetOnchange = (event) => {
    const parseSweetValue = parseInt(event.target.value);
    sweetValue.current = parseSweetValue * 2;
    setCurrentSweet(parseSweetValue)
  };

  const [클릭함, set클릭함] = useState(0);
  // 필터링
  const [useArry, setUseArray] = useState([]);

  const searchOnClick = (event) => {
    set클릭함(1);
    console.log(event)
    console.log(tastingValue.current);
    console.log(baseValue.current);
    console.log(boozyValue.current);
    console.log(sweetValue.current);

    // 테이스팅
    // 빈배열 만들기
    const tastingArray = [];
    // 결과값 반복문
    if (tastingValue.current.length == 0) {
      tastingArray.push(API);
      console.log("비어이씀");
    } else {
      for (let tValue of tastingValue.current) {
        tastingArray.push(API.filter((val) => val.flavor.includes(tValue)));
      }
    }

    const concatTA = tastingArray[0]
      .concat(tastingArray[1])
      .concat(tastingArray[2])
      .concat(tastingArray[3])
      .concat(tastingArray[4]);
    console.log(concatTA);

    // 베이스
    const baseArray = [];
    if (baseValue.current.length == 0) {
      baseArray.push(API);
      console.log("베이스 비어이씀");
    } else {
      for (let bValue of baseValue.current) {
        const search = API.filter((val) => val.base.includes(bValue));
        // console.log(search)
        baseArray.push(search);
      }
    }
    console.log(baseArray);
    const concatBA = baseArray[0]
      .concat(baseArray[1])
      .concat(baseArray[2])
      .concat(baseArray[3])
      .concat(baseArray[4]);
    console.log(concatBA);

    // 얼마나 취할래
    const boozyArray = [];
    const searchBoozy = API.filter(
      (val) => val.booziness <= boozyValue.current
    );
    // console.log(search)
    boozyArray.push(searchBoozy);
    console.log(boozyArray);

    // sweet or dry
    const sweetArray = [];
    const searchSweet = API.filter(
      (val) => val.sweetness <= sweetValue.current
    );
    // console.log(search)
    sweetArray.push(searchSweet);
    console.log(sweetArray);

    // 네 가지 항목 필터링
    const allFilter = concatTA
      .filter((val) => concatBA.includes(val))
      .filter((val) => boozyArray[0].includes(val))
      .filter((val) => sweetArray[0].includes(val));
    console.log(allFilter);

    // 중복제거
    const removeDuplicate = Array.from(new Set(allFilter));
    console.log(removeDuplicate);
    setUseArray(removeDuplicate);
    // setUseArray(removeDuplicate.filter(item => item !== undefined));
  };

  return (
    <div className={mainStyles.filterSection}>
      <h2>Filter Section</h2>
      {/* 필터+검색결과 */}
      <div className={mainStyles.filterContainer}>
        {/* 필터 */}
        <div className={mainStyles.filter_box}>
          <div className={mainStyles.tastingNote}>
            <h3>테이스팅 노트</h3>
            <div id={mainStyles.checkBoxList}>

              {tastingNoteList.map((val) => (
                <label>
                  <input
                    onChange={tastingOnChange}
                    value={val.value}
                    type="checkbox"
                    className={mainStyles.cBox}
                  />
                  <i className={mainStyles.circle}></i>
                  <span className={mainStyles.text}>{val.name}</span>
                  <img className={mainStyles.emoji} src={emoji.filter((item)=> item["value"] == val.value)[0].url} />
                  </label>
              ))}

            </div>
          </div>
          <div className="base">
            <h3>베이스</h3>
            <div id={mainStyles.checkBoxList}>
              
            {baseList.map((val) => (
                <label>
                  <input
                    onChange={baseOnChange}
                    value={val.value}
                    type="checkbox"
                    className={mainStyles.cBox}
                  />
                  <i className={mainStyles.circle}></i>
                  <span className={mainStyles.text}>{val.name}</span>
                  <img className={mainStyles.emoji} src={emoji.filter((item)=> item["value"] == val.value)[0].url} />
                  </label>
              ))}
              
    
            </div>
          </div>
          <div className="alcohol">
            <h3>얼마나 취할래</h3>
            <div className={mainStyles.slider}>
              <Box sx={{ width: 250 }}>
                <SliderStyle
                  onChange={boozyOnChange}
                  min={1}
                  max={5}
                  defaultValue={currentBoozy}
                  marks={alcoholMarks}
                  valueLabelDisplay="auto"
                />
    
                {/* <label><img src={find_emoji} /></label> */}
                
                {/* {/* <option value="3" label="😣"></option> */}
                {/* <option value="1" label="개가될거야!!!"></option> */}
              </Box>
            </div>
          </div>
          <div className="dry">
            <h3>Sweet or Dry?</h3>
            <div className={mainStyles.slider}>
              <Box
                sx={{
                  width: 250,
                }}
              >
                <SliderStyle
                  onChange={sweetOnchange}
                  min={1}
                  max={5}
                  defaultValue={currentSweet}
                  marks={dryMarks}
                  valueLabelDisplay="auto"
                />
              </Box>
            </div>
          </div>

          <button onClick={searchOnClick} id={mainStyles.filterBtn}>
           검색
          </button>
        </div>

        {/* 결과 칵테일 카드 */}
        <div className={mainStyles.cardContainer}>
          {클릭함 == 1 ? (
            useArry.length > 0 ? (
              useArry.map((cocktail) => (
                <Card
                  key={cocktail._id.$oid}
                  id={cocktail._id.$oid}
                  img={cocktail.S3_img}
                  name={cocktail.name}
                />
              ))
            ) : (
              <div>데이터가 업서요</div>
            )
          ) : (
            API.map((cocktail) => (
              <Card
                key={cocktail._id.$oid}
                id={cocktail._id.$oid}
                img={cocktail.S3_img}
                name={cocktail.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default Filter;