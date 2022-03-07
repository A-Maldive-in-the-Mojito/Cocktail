import styles from './Header.module.css';
import { Link } from 'react-router-dom';

import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Email, Style } from '@material-ui/icons';
import { style } from '@mui/system';

import axios from "axios";
import $ from "jquery";

import { useEffect } from "react";

const URL = 'http://localhost:5000'

export default function Header() {


    // kakao login api
    function kakaoLogin() {
        window.Kakao.Auth.login({
            scope: 'profile_nickname, profile_image', //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
            success: function (response) {
                console.log(response) // 로그인 성공하면 받아오는 데이터
                window.Kakao.API.request({ // 사용자 정보 가져오기
                    url: '/v2/user/me',
                    success: (res) => {
                        const kakao_account = res.kakao_account;
                        console.log(kakao_account.email);
                        console.log(kakao_account.profile.nickname);
                        console.log(kakao_account.profile.profile_image_url);

                        const email = kakao_account.email
                        const nickname = kakao_account.profile.nickname
                        const profile_img = kakao_account.profile.profile_image_url

                        // BackEnd로 보내기
                        $.ajax({
                            type: "post",
                            url: `${URL}/kakao`,
                            data: {
                                email: email,
                                nickname: nickname,
                                profile_img: profile_img,
                            },
                            success: function (response) {
                                alert("성공");
                            }
                        })

                    
                        // axios.post(
                        //     `${URL}/kakao`,

                        //     {
                        //         hi: "hihi",
                        //         //   email: email,
                        //         //   nickname: nickname,
                        //         //   profile_img : profile_img,

                        //     })
                        //     .then((res) => {
                        //         console.log(res);
                        //         alert("성공");
                        //         // history.push("/main/feed");
                        //     })
                        //     .catch((error) => {
                        //         // console.log(error);
                        //         console.error(error);
                        //         alert("카카오 로그인 에러?");
                        //     });

                    },
                    fail: function (error) {
                        console.log(error);

                    }
                });
                // window.location.href='/' //리다이렉트 되는 코드
            },
            fail: function (error) {
                console.log(error);
            }
        })
    };


    return (
        <div>
            <div className={styles.menu_box}>
                <h1 className={styles.logo}>
                    <Link to="/">
                        <span id={styles.emogi}>🍹</span>
                        모히또에서 몰디브 한 잔</Link></h1>
                <ul>
                    <li>
                        <Link to="/find">칵테일 검색</Link>
                    </li>
                    <li>
                        <Link to="/home">고향 칵테일</Link>
                    </li>
                    <li>
                        <Link to="/storage">내 칵테일 창고</Link>
                    </li>
                    <li>
                        <div className={styles.login} onClick={() => kakaoLogin()}>
                            <span className={styles.loginText}>login</span>
                            {/* <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} className={styles.loginIcon} /> */}
                        </div>


                    </li>
                </ul>
            </div>
            {/* 스크롤업 화살표 */}
            <div className={styles.scroll}>
                <img src="arrow-up-circle.svg"></img></div>






        </div>
    );
}