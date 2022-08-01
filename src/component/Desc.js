import styles from "./Desc.module.css";

import { useParams } from "react-router-dom";

//contect
import { useContext } from "react";
import { APIContext } from "../context/APIContext";

function Desc() {
  //주소에서 id받기
  const { id } = useParams();
  console.log(id);

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

  console.log(hashtag)

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

  return (
    <div id="desc" className={styles.container}>
      {/* 이미지+설명 */}
      <div>
        <div className={styles.box}>
          <img src={img}></img>
        </div>

        <span></span>
      </div>
      {/* 레시피 */}
      <div className={styles.text_box}>
        <h1>{name}</h1>
        {/* 해시태그 */}
        <div className={styles.tags_box}>
            {hashtag== "no info" ? "" : 
            <div className={styles.hashtag}>
              {hashTagArray.map(val => val.value==hashtag ? val.name: null)}
            </div>
            }
        </div>
        

        {/* 알콜 당도 정보 */}
        <div id="info" className={styles.info}>
          <div className={styles.base}>베이스 {base}</div>
          <div>맛 { flavor=="no info" ? "❓" : flavor }</div>
          <div>알콜세기 {booziness}</div>
          <div>당도 {sweetness}</div>
        </div>
        {/* 재료 */}
        <div>
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
  );
}

export default Desc;