import styles from "./Desc.module.css";

import { useParams } from "react-router-dom";

//contect
import { useContext, useEffect } from "react";
import { APIContext } from "../context/APIContext";

import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Grid from '@mui/material/Grid';

function Desc() {
  //주소에서 id받기
  const { id } = useParams();
  console.log(id,"=>Desc의 id 값");

  //context API받기
  const API = useContext(APIContext);

  const n = API.findIndex((item) => `:${item._id.$oid}` === id);
  console.log(n,"DB에서의 순서");

  const name = API[n].name;
  const img = API[n].img;
  const base = API[n].base;
  const booziness = API[n].booziness;
  const sweetness = API[n].sweetness;
  const flavor = API[n].flavor;
  const hashtag = API[n].hashtag;
  const howtomake = API[n].korean;
  const ingredients = API[n].ingredients;

  console.log(booziness)

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

const baseArray = [
    {
      name: "진",
      img: "🇬🇧",
      value: "gin"
    },
    {
      name: "데킬라",
      img: "🌵",
      value: "tequila"
    },
    {
      name: "럼",
      img: "🏝",
      value: "rum"
    },
    {
      name: "보드카",
      img: "⛄",
      value: "vodka"
    },
    {
      name: "위스키",
      img: "🥃",
      value: "whiskey"
    },
    {
      name: "브랜디",
      img: "🍷",
      value: "brandy"
    },
  ]


  const flavorArray = [
    {
      name: "아이셔",
      img: "🍋",
      value: "아이셔"
    },
    {
      name: "허브",
      img: "🌱",
      value: "허브"
    },
    {
      name: "프레시",
      img: "💧",
      value: "프레시"
    },
    {
      name: "아이써",
      img: "☕",
      value: "아이써"
    },
    {
      name: "과일",
      img: "🍇",
      value: "프루티"
    },

  ]

  //일치하는 hashtag 문자값 찾기 & return 부분에서 쓸 리스트에 넣기
  const hashtags =[];
    function FindHashtags() {
        for(let i=0; i<hashtag.length; i++){
          for(let j=0; j<hashTagArray.length; j++){
            if(hashtag[i]==hashTagArray[j].value){
              hashtags.push(hashTagArray[j].name);
            } else continue; 
          }
          console.log(hashtags,"desc에서 표기될 해시태그 값 리스트");
        }
  } 
  if (hashtag != "no info"){
    FindHashtags()
  } else {console.log("메롱")}

  //slider
  const SliderStyle = styled(Slider)({
    color: "#ff9924",
    height: 6,
    '&.Mui-disabled': {
      color: '#ff9924',
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
      fontSize: 9,
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
      fontSize: "15px",
      marginTop: "3px",
    },
  });

  //마크
  const alcoholMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    }
  ];
  const dryMarks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    }
  ];
  function valuetext(value) {
    return `${value}`;
  }



  //당도 및 알콜세기 값 올림처리
  const ceilBoozy = Math.ceil(booziness/2)
  const ceilSweet = Math.ceil(sweetness/2)

   // 베이스array 비교
  const baseName = baseArray.map(val => val.value == base[0] ? val.name : null)
  const baseImg = baseArray.map(val => val.value == base[0] ? val.img : null)
   // console.log(baseName, baseImg)

   //flavorArray 비교
  const flavorName = flavorArray.map(val => val.value == flavor[0] ? val.name : null)
  const flavorImg = flavorArray.map(val => val.value == flavor[0] ? val.img : null)

  return (
    <div id="desc" className={styles.container}>
      {/* 이미지+설명 */}
      <div className={styles.img_box}>
        <img src={img}></img>

        <span></span>
      </div>
      {/* 레시피 */}
      <div className={styles.text_box}>


        {/* 알콜 당도 정보 */}
        <div id="info" className={styles.info}>
          <div className={styles.info_text}>

            {/* 해시태그 */}
            <div className={styles.tags_box}>
              {hashtag == "no info" ? "" :
                <div className={styles.tags_box}>
                  {hashtags.map(val => (<div className={val == "#TOP 100🏆" ? `${styles.TOP} ${styles.hashtag}` : styles.hashtag}>{val}</div>))}
                </div>
              }
            </div>
            {/* 칵테일 이름 */}
            <h1>{name}</h1>
            {/* 베이스 맛 */}
            <div className={styles.bf}>
              <div className={styles.base}>베이스
                <div className={styles.base_img}> {base == "no info" || base.length < 1 ? "❓" : baseImg} </div>
                <div className={styles.base_name}> {base == "no info" ? null : baseName} </div>
              </div>
              <div className={styles.flavor}>테이스팅 노트
                <div className={styles.flavor_img}> {flavor == "no info" || flavor.length < 1 ? "❓" : flavorImg} </div>
                <div className={styles.flavor_name}> {flavor == "no info" ? null : flavorName} </div>
              </div>
            </div>

              {/* 알콜세기 및 당도 */}
              <div className={styles.slider}>
              <Box sx={{ width: 400 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2.5} textAlign="center">
                  GENTLE
                </Grid>
                  <Grid item xs={7}>
                      <SliderStyle
                        aria-label="Always visible"
                        defaultValue={ceilBoozy}
                        disabled={true}
                        getAriaValueText={valuetext}
                        min={1}
                        max={5}
                        step={null}
                        marks={alcoholMarks} 
                      />
                  </Grid>
                  <Grid item xs={2.5} textAlign="center">
                    BOOZY
                  </Grid>
                </Grid>
              </Box>
          </div>
          <div className={styles.slider}>
          <Box sx={{ width: 400 }}>
              <Grid container spacing={2} alignItems="center">
              <Grid item xs={2.5} textAlign="center">
              SWEET
                </Grid>
                  <Grid item xs={7} >
                      <SliderStyle
                        aria-label="Always visible"
                        defaultValue={ceilSweet}
                        disabled={true}
                        getAriaValueText={valuetext}
                        min={1}
                        max={5}
                        step={null}
                        marks={dryMarks} 
                      />
                  </Grid>
                  <Grid item xs={2.5} textAlign="center">
                      DRY
                  </Grid>
                </Grid>
              </Box>
          </div>
          </div>

          {/* 재료 */}
          <div className={styles.recipe}>
            <div className={styles.recipe_title}>Recipe</div>
            <ul className={styles.ingredients}>
              {ingredients.map((item) => (
                <li>
                  {item.재료} {item.양}
                </li>
              ))}
            </ul>
            <div className={styles.mix}>
              <h4>믹스방법</h4>
              <p>{howtomake}</p>
            </div>
          </div>

        </div>


      </div>
    </div>

  );
}

export default Desc;