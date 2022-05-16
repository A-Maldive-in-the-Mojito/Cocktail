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
        {/* 해시태그 없으면 안보이기 */}
        {hashtag == "no info" ? "" : <span>#해시태그 {hashtag}</span>}

        {/* 알콜 당도 정보 */}
        <div id="info" className={styles.info}>
          <div className={styles.base}>베이스 {base}</div>
          <div>맛 {flavor}</div>
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
