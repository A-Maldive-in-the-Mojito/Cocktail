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
import Oauth from './Oauth.js';
// 리덕스
import { useSelector, useDispatch, connect } from 'react-redux';
//리덕스 액션
import { getStore } from "./redux/getStore.js"
// import { PersistGate } from 'redux-persist/integration/react';

//라우터
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import $ from "jquery";
import axios from "axios";
import { useEffect, useState } from "react";

import { code } from './Oauth.js'

// context
import { createContext } from 'react';

import { APIContext } from './context/APIContext'

const URL = 'http://localhost:5000'

function App({ dispatchGetStore }) {
    let [cocktailsInfo, setcocktailsInfo] = useState([]);

    // 이메일 가져오기
    const reduxState = useSelector(state => state);
    const email = reduxState.email.email
    // console.log(email)

    // 로그인한 멤버 저장칵테일 GET
    const getMemberInfo = async (email) => {
        console.log(email)
        const response = await axios.get(`${URL}/login?email_give=${email}`);
        const memberInfo = JSON.parse(response.data.member_info);
        const storeCocktail = memberInfo[0].store
        console.log(storeCocktail);
        
        dispatchGetStore(storeCocktail);
    };
    // axios get 호출
    useEffect(() => {
        getMemberInfo(email)
    }, []);


    // API GET
    const getCocktails = async () => {
        const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
        const cocktails = JSON.parse(all_cocktails)

        setcocktailsInfo(cocktails);

        //redux store로 보내기      
        // getArray(cocktails); 
        // console.log(store.getState());    
    };

    useEffect(() => {
        getCocktails()
    }, []);

    console.log(store.getState());

    // const useID = useSelector((state) => state)
    // console.log(useID);


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
                            <Route path="/find" element={<Find />} /> //칵테일 검색(모든칵테일)
                            <Route path="/home" element={<Home />} /> //고향칵테일
                            <Route path="/storage" element={<Storage />} /> //내 칵테일
                            <Route path="/desc:id" element={<Desc />} />
                            <Route path="/oauth" element={<Oauth />} />
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
        dispatchGetStore: array => dispatch(getStore(array))
    };
}

export default connect(null, mapDispatchToProps)(App);
// export default App;