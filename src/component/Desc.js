import styles from "./Desc.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

//contect
import { useContext } from "react";
import { APIContext } from "../context/APIContext";

function Desc() {
  //주소에서 id받기
  const { id } = useParams();
  console.log(id);

  // 리덕스로 api받기
  // const cocktail_api = useSelector((state) => state)

  //context API받기
  const API = useContext(APIContext);

  const n = API.findIndex((item) => `:${item._id.$oid}` === id);
  console.log(n);

  const name = API[n].name;
  const img = API[n].img;
  const base = API[n].base;
  const booziness = API[n].booziness;
  const sweetness = API[n].sweetness;
  const flavor = API[n].flavor;
  const hashtag = API[n].hashtag;
  const howtomake = API[n].korean;
  const ingredients = API[n].ingredients;

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

  //일치하는 hashtag 문자값 찾기 & return 부분에서 쓸 리스트에 넣기
  const hashtags = [];
  function FindHashtags() {
    for (let i = 0; i < hashtag.length; i++) {
      for (let j = 0; j < hashTagArray.length; j++) {
        if (hashtag[i] == hashTagArray[j].value) {
          hashtags.push(hashTagArray[j].name);
        } else continue;
      }
      console.log(hashtags, "desc에서 표기될 해시태그 값 리스트");
    }
  }
  if (hashtag != "no info") {
    FindHashtags()
  } else { console.log("메롱") }

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
            <h1>{name}</h1>
            
            {/* 해시태그 */}
            <div className={styles.tags_box}>
              {hashtag == "no info" ? "" :
                <div className={styles.tags_box}>
                  {hashtags.map(val => (<div className={styles.hashtag}>{val}</div>))}
                </div>
              }
            </div>


            <div className={styles.base}>베이스 {base}</div>
            <div>맛 {flavor == "no info" ? "❓" : flavor}</div>
            <div>알콜세기 {booziness}</div>
            <div>당도 {sweetness}</div>
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