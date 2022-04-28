import styles from './Desc.module.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";

import { useParams } from 'react-router-dom';

function Desc() {
    //주소에서 id받기
    const { id } = useParams();
    console.log(id);

    // 리덕스로 api받기
    const cocktail_api = useSelector((state) => state
    )
    // useEffect(() => {
    //     console.log(cocktail_api)
    // }, []);

    const n = cocktail_api.findIndex(item => `:${item._id.$oid}` === id)
    console.log(n)

    const name = cocktail_api[n].name
    const img = cocktail_api[n].img
    const base = cocktail_api[n].base
    const booziness = cocktail_api[n].booziness
    const sweetness = cocktail_api[n].sweetness
    const flavor = cocktail_api[n].flavor
    const hashtag = cocktail_api[n].hashtag
    const howtomake = cocktail_api[n].korean
    const ingredients = cocktail_api[n].ingredients




    return (
        <div id="desc">
            {/* 이미지+설명 */}
            <div>
                <div className={styles.box}>
                    <img src={img}></img>
                </div>

                <span></span>
            </div>
            {/* 레시피 */}
            <div>
                <h1>{name}
                </h1>
                <span>#해시태그 {hashtag}</span>
                {/* 알콜 당도 정보 */}
                <div id="info">
                    <div>베이스: {base}</div>
                    <div>맛: {flavor}</div>
                    <div>알콜세기 {booziness}</div>
                    <div>당도 {sweetness}</div>
                </div>
                {/* 재료 */}
                <div>
                    <ul>
                        {ingredients.map((item) =>
                            <li>{item.재료} {item.양}</li>)}
                    </ul>
                    <h4>믹스방법</h4>
                    <p>{howtomake}</p>
                </div>
            </div>

        </div>
    );
}

export default Desc;