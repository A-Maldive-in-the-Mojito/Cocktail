import styles from './Storage.module.css' // ../은 상위폴더
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import $ from "jquery";
import { useEffect } from "react";

import { Provider, useSelector, useDispatch } from 'react-redux';

//contect
import { useContext } from 'react';
import { APIContext } from '../context/APIContext';
import { store } from '../redux/store';
import storage from 'redux-persist/lib/storage';
const URL = 'http://localhost:5000'

// 백에서 토큰 받아오는 axios
function Storage() {

    //context 모든 칵테일 API
    const API = useContext(APIContext);
    const useID = useSelector((state) => state)
    console.log(useID);

    const reduxState = useSelector(state => state);
    const storeCocktail = reduxState.store.store

    //api 정제
    const fav = API.filter((val) => (
        storeCocktail.includes(val.name)
    ))

    console.log(fav);


    return (
        <div>
            <div className='wrapper'>
                <div className={styles.cardContainer}>
                    {fav.map((cocktail) =>
                    (<Card
                        key={cocktail._id.$oid}
                        id={cocktail._id.$oid}
                        img={cocktail.S3_img}
                        name={cocktail.name}
                    />
                    ))}
                </div>
            </div>
        </div>

    )
};
export default Storage;