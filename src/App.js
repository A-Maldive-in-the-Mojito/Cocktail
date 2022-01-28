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


//라우터
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />   //Top100+Filter
          <Route path="/find" element={<Find />}/>  //칵테일 검색(모든칵테일) 
          <Route path="/home" element={<Home />}/>  //고향칵테일
          <Route path="/storage" element={<Storage />}/>  //내 칵테일
          <Route path="/login" element={<Login />}/>  //로그인
          <Route path="/desc" element={<Desc />}/>
        </Routes>
      </div>
    </BrowserRouter >
  );
}

export default App;
