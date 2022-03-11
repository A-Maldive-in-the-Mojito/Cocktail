import './App.css';
import styles from './App.module.css';
//페이지 불러오기
import Header from './component/Header.js';
import Main from './component/main_page/Main.js';
import Find from './component/Find.js';
import Storage from './component/Storage.js';
import Login from './component/Login.js';
import Home from './component/Home.js';
import Desc from './component/Desc.js';
import Oauth from './Oauth.js';


//라우터
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import $ from "jquery";
import axios from "axios";
import { useEffect } from "react";

import { code } from './Oauth.js'

// //리액트 리덕스 생활코딩 참고
// import { createStore } from 'redux';
// import { Provider, useSelector, useDispatch } from 'react-redux'; 

// function reducer(currentState, action){
//     if(currentState == undefined){
//         return{code: 1};
//     }
//     const newState = {...currentState};
//     newState.code = 
//     return newState;
// }

// const store = createStore(reducer);

const URL = 'http://localhost:5000'

function App() {

    // API GET
    const getCocktails = async () => {
        const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
        console.log(all_cocktails);
    };
    useEffect(() => {
        getCocktails()
    });


        return (  
            <BrowserRouter>
                <div className="App">
                    <Header />
                    <div id="pages">
                        <Routes>
                            <Route path="/" element={<Main />} /> //Top100+Filter
                            <Route path="/find" element={<Find />} /> //칵테일 검색(모든칵테일)
                            <Route path="/home" element={<Home />} /> //고향칵테일
                            <Route path="/storage" element={<Storage />} /> //내 칵테일
                            <Route path="/desc" element={<Desc />} />
                            <Route path="/oauth" element={<Oauth />} />
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

    export default App;
