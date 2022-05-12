import appStyles from './Storage.module.css' // ../은 상위폴더
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import $ from "jquery";
import { useEffect } from "react";

import { Provider, useSelector, useDispatch } from 'react-redux'; 

//contect
import { useContext } from 'react';
import { APIContext } from '../context/APIContext';


// 백에서 토큰 받아오는 axios
function Storage() {

    //context API받기
    const API = useContext(APIContext);
 

    return(
        <div>
        <div className='wrapper'>
            <Link to="/desc">
                <Card />
            </Link>
            
        </div>
        
        </div>

    )
};
export default Storage;