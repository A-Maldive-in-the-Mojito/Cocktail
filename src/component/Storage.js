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
import { store } from '../redux/store';
import storage from 'redux-persist/lib/storage';


// 백에서 토큰 받아오는 axios
function Storage() {

    //context API받기
    const API = useContext(APIContext);
    const useID = useSelector((state) => state)
    console.log(useID);


 

    return(
        <div>
        <div className='wrapper'>
            {/* <Link to="/desc">
                <Card key={cocktail._id.$oid}
                    id={cocktail._id.$oid}
                    img={cocktail.img}
                    name={cocktail.name}/>
            </Link> */}
            
        </div>
        
        </div>

    )
};
export default Storage;