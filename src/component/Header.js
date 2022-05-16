import styles from "./Header.module.css";
import { Link } from "react-router-dom";

// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { Email, Style } from '@material-ui/icons';
// import { style } from '@mui/system';

import axios from "axios";
import $ from "jquery";

import { useEffect, useState } from "react";

// 임시 로컬주소
const URL = "http://localhost:5000";

function Header() {
  //로그인 했을때 버튼:logout으로 바꾸기
  const [loginBtn, setLoginBtn] = useState("login");

  const remainToken = localStorage.length
        useEffect(() =>{
            if (remainToken == 1){
            setLoginBtn("logout")
            }
        })
  
  // 로그인 상태 판별
  function LoginOrOut() {
    const ValToken = window.Kakao.Auth.getAccessToken();
    ValToken == null ? kakaoLogin() : kakaoLogout();
  }

  // 카카오 로그아웃
  function kakaoLogout() {
    if (!window.Kakao.Auth.getAccessToken()) {
      alert("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(function () {
      alert("logout ok\naccess token -> " + window.Kakao.Auth.getAccessToken());
      //usestate 변경
      setLoginBtn("login");
    });
    console.log(window.Kakao.Auth.getAccessToken());
  }

  // id GET
  // 보낼 데이터를 URL에 넣음
  const member = async (email) => {
    const {
      data: { member_id },
    } = await axios.get(`${URL}/login?email_give=${email}`);
    console.log(member_id);
  };

  // kakao login api
  function kakaoLogin() {
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image", //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
      success: function (response) {
        console.log(response); // 로그인 성공하면 받아오는 데이터
        window.Kakao.API.request({
          // 사용자 정보 가져오기
          url: "/v2/user/me",
          success: (res) => {
            const kakao_account = res.kakao_account;
            console.log(kakao_account.email);
            console.log(kakao_account.profile.nickname);
            console.log(kakao_account.profile.profile_image_url);

            const email = kakao_account.email;
            const nickname = kakao_account.profile.nickname;
            const profile_img = kakao_account.profile.profile_image_url;

            //axios 이용하여 Backend 로 보내기.
            axios
              .post(`${URL}/login`, {
                email_give: email,
                name_give: nickname,
                img_give: profile_img,
              })
              .then((res) => {
                console.log(res);
                alert("성공");
                // history.push("/main/feed");
              })
              .catch((error) => {
                // console.log(error);
                console.error(error);
                alert("카카오 로그인 에러");
              });

            // id GET 호출
            member(email);
            // 버튼 글자 바꾸기
            setLoginBtn("logout");
          },
          fail: function (error) {
            console.log(error);
          },
        });
        // window.location.href='/' //리다이렉트 되는 코드
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  return (
    <div>
      <div className={styles.menu_box} id="menu_bar">
        <ul>
          <li>
            <h1 className={styles.logo}>
              <Link to="/">
                <span id={styles.emogi}>🏝 </span>
                모히또에서 몰디브 한 잔
              </Link>
            </h1>
          </li>
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
            <div className={styles.login} onClick={LoginOrOut}>
              <span className={styles.loginText}>{loginBtn}</span>
              {/* <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} className={styles.loginIcon} /> */}
            </div>
          </li>
        </ul>
      </div>
      {/* 스크롤업 화살표 */}
      <div
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
        className={styles.scroll}
      >
        <img src="arrow-up-circle.svg"></img>
      </div>
    </div>
  );
}
export default Header;