import appStyles from './Storage.module.css' // ../은 상위폴더
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import $ from "jquery";
import { useEffect } from "react";

import { Provider, useSelector, useDispatch } from 'react-redux'; 




// 백에서 토큰 받아오는 axios
export default function Storage() {
 
    const code = useSelector(state=> state.code);
    console.log(code)

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