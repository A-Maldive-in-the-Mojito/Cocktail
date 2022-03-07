// import React from "react";
// import { Link } from 'react-router-dom'

import axios from "axios"
import $ from "jquery";
import { useEffect, createContext } from "react";
// import { useDispatch } from "react-redux";

import Main from './component/main_page/Main.js';

//리액트 리덕스 생활코딩 참고
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Email } from "@material-ui/icons";

// email
// nickname
// img

function Oauth() {

    // function kakaoLogin() {
        // window.Kakao.Auth.login({
        //     scope: 'profile_nickname, profile_image', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
        //     success: function (response) {
        //         console.log(response) // 로그인 성공하면 받아오는 데이터
        //         window.Kakao.API.request({ // 사용자 정보 가져오기
        //             url: '/v2/user/me',
        //             success: (res) => {
        //                 const kakao_account = res.kakao_account;
        //                 console.log("로그인", kakao_account)
        //             }
        //         });
        //         // window.location.href='/ex/kakao_login.html' //리다이렉트 되는 코드
        //     },
        //     fail: function (error) {
        //         console.log(error);
        //     }
        // });
    // };

    // useEffect(() => {
    //     kakaoLogin()
    // });



    // const code = useSelector(state=> state.code);
    // console.log(code)



    // 인가코드
    // let code = new URL(window.location.href).searchParams.get("code");
    // console.log(code);

    // function postCode() {
    //     $.ajax({
    //       type: "post",
    //       url: 'http://localhost:5000/oauth',
    //       data: {code_give: code},
    //       success: function (response) {        
    //       }
    //     })
    //   };

    // const getUserInfo = async () => {
    //     const response = await axios.get(`http://localhost:3000/oauth?code=${code}`);
    //     console.log(response);
    // };
    // useEffect(() => {
    //     getUserInfo()
    // });

    // function postCode() {
    //     axios.post(
    //         'http://localhost:5000/oauth',
    //         {code_give: code}
    //     )
    //     .then(
    //         function(response) {
    //             console.log(response); 
    //         })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    // };



    // React.useEffect(async () => {
    //   await dispatch(userActions.kakaoLogin(code));
    // }, []);


    // };


    //     return (
    //      <Main />
    //  );

};


// //인가코드를 예쁘게 콘솔로그에 담았음.
// let Authcode = new URL(window.location.href).searchParams.get('code');




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
export default Oauth;
