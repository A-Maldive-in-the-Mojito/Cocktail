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
import { connect } from "react-redux";

import { Provider, useSelector, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

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

function App({ }) {
    let [cocktailsInfo, setcocktailsInfo] = useState([]);

    // API GET
    const getCocktails = async () => {
        const { data: { all_cocktails } } = await axios.get(`${URL}/cocktails`);
        const cocktails = JSON.parse(all_cocktails)

        setcocktailsInfo(cocktails);
        

        //redux store로 보내기      
        // getArray(cocktails); 
        // console.log(store.getState());    
    };




    // console.log(cocktailsInfo);
    // console.table(cocktailsInfo);

    // 리덕스
    // function reducer(state = cocktailsInfo, action) {
    //     return state
    // }

    // const store = createStore(reducer);


    useEffect(() => {
        getCocktails()
    }, []);
    
    console.log(store.getState());

    // const useID = useSelector((state) => state)
    // console.log(useID);
    

    return (
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
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
                </PersistGate>
            </Provider>
        </BrowserRouter>        
    );
}

// function mapDispatchProps(dispatch) {
//     return {
//         getArray: array => dispatch(get(array))}
// }

// export default connect (null, mapDispatchProps) (App);
export default App;