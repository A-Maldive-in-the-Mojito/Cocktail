import { useEffect } from "react";

import axios from "axios";
import $ from "jquery";
// import { KAKAO_AUTH_URL } from "../AUTH_URL";



function Login() {

    function kakaoLogin() {
        window.Kakao.Auth.authorize({
            redirectUri: 'http://127.0.0.1:3000/oauth2'
          })
        
        window.Kakao.Auth.login({
            scope: 'profile_nickname, profile_image', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
            success: function (response) {
                console.log(response) // 로그인 성공하면 받아오는 데이터
                window.Kakao.API.request({ // 사용자 정보 가져오기
                    url: '/v2/user/me',
                    success: (res) => {
                        const kakao_account = res.kakao_account;
                        console.log("로그인", kakao_account)
                    }
                });
                // window.location.href='/ex/kakao_login.html' //리다이렉트 되는 코드
            },
            fail: function (error) {
                console.log(error);
            }
        });
    }



    // const { Kakao } = window;
    // const loginWithKakao = () => {
    //     console.log(Kakao);
    //     Kakao.Auth.authorize({
    //         redirectUri: 'http://127.0.0.1:3000/oauth2'
    //     });

    // }


    // function kakaoLogin() {
    //     Kakao.Auth.login({
    //         success: function (response) {
    //             Kakao.API.request({
    //                 url: '/v2/user/me',
    //                 success: function (response) {
    //                     console.log(response)
    //                 },
    //                 fail: function (error) {
    //                     console.log(error)
    //                 },
    //             })
    //         },
    //         fail: function (error) {
    //             console.log(error)
    //         },
    //     })
    // }


    return (
        <div>
            <a id="custom-login-btn" >
                <img
                    src="//k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                    width="222"
                    alt="카카오 로그인 버튼"
                />
            </a>
            <p id="token-result"></p>




            <form>
                <h1>로그인하세요</h1>
                <input type="text" placeholder="ID"></input>
                <input type="password" placeholder="PASSWORD"></input>
                <button onClick={useEffect(() => {
                    kakaoLogin()
                })}>Login</button>
                <button>LogOut</button>
        </form>
        {/* 로그인 했을때 보이도록 */ }
    {/* <button id="logout" class="hidden">Log out</button> */ }

    {/* 레스트api */ }
    {/* <div>
                <a href={KAKAO_AUTH_URL}>
                    <img style={{ width: 180, height: 60 }} src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png" alt="" />
                </a>
            </div> */}



    {/*<p><button onClick={() => {*/ }

    {/*    axios.get('/search')*/ }
    {/*        .then((result) => { console.log(result.data) }) // 요청 성공시 실행코드*/ }
    {/*        .catch(() => { }) // 요청 실패시 실행코드*/ }

    {/*}}>더보기</button></p>*/ }

        </div >
    );
}
export default Login;