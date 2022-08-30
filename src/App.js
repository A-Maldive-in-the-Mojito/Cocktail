import { store, persistor } from './redux/store.js';

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
// import { PersistGate } from 'redux-persist/integration/react';

//라우터
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import axios from "axios";
import { useEffect, useState } from "react";


// context
import { createContext } from 'react';

import { APIContext } from './context/APIContext'


// 리덕스
import { getEmoji } from "./redux/getEmoji.js"
import { connect, useSelector } from "react-redux";


const URL = 'http://localhost:5000'

function App({ dispatchGetEmoji }) {
    let [cocktailsInfo, setcocktailsInfo] = useState([]);

    // API GET
    const getCocktails = async () => {
        const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
        const cocktails = JSON.parse(all_cocktails)

        setcocktailsInfo(cocktails);
    };
    useEffect(() => {
        getCocktails()
    }, []);

    const getEmojis = async () => {
        const {data: {emojis}} = await axios.get(`${URL}/emojis`)
        const emoji = JSON.parse(emojis);
        dispatchGetEmoji(emoji);

    };

    useEffect(() => {
        getEmojis()
    }, []);



    

   

    return (
        <BrowserRouter>
            {/* <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}> */}
            <APIContext.Provider value={cocktailsInfo}>
                <div className="App">
                    <Header />
                    <div id="pages">
                        <Routes>
                            <Route path="/" element={<Main />} /> //Top100+Filter
                            <Route path="/find:linkTop100" element={<Find />} /> //칵테일 검색(모든칵테일)
                            <Route path="/home" element={<Home />} /> //고향칵테일
                            <Route path="/storage" element={<Storage />} /> //내 칵테일
                            <Route path="/desc:id" element={<Desc />} />
                        </Routes>
                    </div>
                </div>
            </APIContext.Provider>
            {/* </PersistGate>
            </Provider> */}
        </BrowserRouter>
    );
}


function mapDispatchToProps(dispatch) {
    return {
        dispatchGetEmoji: emoji => dispatch(getEmoji(emoji)),
    };
}

export default connect(null, mapDispatchToProps)(App);