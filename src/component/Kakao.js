import React from "react";
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import Home from './Home.js';

// const Kakao = (props) => {
//     // const dispatch = useDispatch();
  
//     // 인가코드
//     let code = new URL(window.location.href).searchParams.get("code");
  
//     // React.useEffect(async () => {
//     //   await dispatch(userActions.kakaoLogin(code));
//     // }, []);
  
//     return <Home />;
// };


// //인가코드를 예쁘게 콘솔로그에 담았음.
// let Authcode = new URL(window.location.href).searchParams.get('code');
// console.log(Authcode);



// // 벡으로 인가코드 POST
// const AuthToServer = async() => {
//     // let Authcode = new URL(window.location.href).searchParams.get('code');
//     axios.post('http://localhost:5000/getAuth', {
//         "Authcode": Authcode
//     }).then(function (response) {
//         alert("성공입니다.")
//     }).catch(function (error) {
//         alert("실패입니다..")
//     });
// }
// useEffect(()=> { AuthToServer()} );

// 백에서 토큰 받아오는 axios
// export default function Kakao() {
//     console.log(code)

    
//     // const gettoken = async() => {
//     //     const {data: {token}} = await axios.get('http://localhost:5000/tokens');
//     //     console.log(token);
//     // };
//     // useEffect(()=> { gettoken()} );
    
//     return(
//         <div className='wrapper'>
//             {/* <Link to="/desc">
//                 <Card />
//             </Link> */}
//         </div>
//     )
// };
export default Kakao;