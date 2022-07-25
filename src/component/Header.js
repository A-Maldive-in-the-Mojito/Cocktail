import styles from "./Header.module.css";
import { Link } from "react-router-dom";

// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import { Email, Style } from '@material-ui/icons';
// import { style } from '@mui/system';

import axios from "axios";
import { useEffect, useState } from "react";

//리덕스
import { connect, useSelector } from "react-redux";
import { getEmail, removeEmail } from "../redux/getEmail.js";
import { getStore, removeStore } from "../redux/getStore.js";
import { store } from "../redux/store.js";

// 임시 로컬주소
const URL = "http://localhost:5000";
const mainURL = "http://localhost:3000/";

function Header({
  dispatchGetEmail,
  dispatchGetStore,
  dispatchRemoveEmail,
  dispatchRemoveStore,
}) {
  //카카오 로그인 허가 토큰 가져오는 코드
  const ValToken = window.Kakao?.Auth.getAccessToken();

  // 페이지 처음 접속 시 로그인 상태 판별 및 버튼 글자 바꾸기
  useEffect(
    () => (ValToken == null ? setLoginBtn("Login") : setLoginBtn("Logout")),
    []
  );

  //로그인 버튼 글자 조작하는 useState.
  const [loginBtn, setLoginBtn] = useState("login");

  // onClick 시 실행되는 로그인 상태 판별
  function LoginOrOut() {
    return ValToken == null ? kakaoLogin() : kakaoLogout();
  }

  // 카카오 로그아웃
  function kakaoLogout() {
    if (!window.Kakao.Auth.getAccessToken()) {
      alert("Not logged in.");
      return;
    }
    window.Kakao.Auth.logout(function () {
      alert("logout ok\naccess token -> " + window.Kakao.Auth.getAccessToken());
      //로그인버튼 글자 바꾸기.
      setLoginBtn("Login");
      window.location.href = `${mainURL}`;
    });
    //redux persist 에 저장된 Email 정보 삭제
    dispatchRemoveEmail();
    //redux persist 에 저장된 store 정보 삭제
    dispatchRemoveStore();
  }

  // 카카오 로그인 실행함수
  function kakaoLogin() {
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image", //동의항목 페이지에 있는 개인정보 보호 테이블의 활성화된 ID값을 넣습니다.
      success: function (response) {
        // console.log(response) // 로그인 성공하면 받아오는 데이터
        window.Kakao.API.request({
          // 사용자 정보 가져오기
          url: "/v2/user/me",
          success: (res) => {
            const kakao_account = res.kakao_account;

            const email = kakao_account.email;
            const nickname = kakao_account.profile.nickname;
            const profile_img = kakao_account.profile.profile_image_url;

            //확인용 console log
            console.log(email);
            console.log(nickname);
            console.log(profile_img);
            //redux store로 email 값 보내기.
            dispatchGetEmail(email);

            //axios 이용하여 Backend 로 보내기.
            axios
              .post(`${URL}/login`, {
                email_give: email,
                name_give: nickname,
                img_give: profile_img,
              })
              .then((res) => {
                alert("성공");
                // history.push("/main/feed");
              })
              .catch((error) => {
                // console.log(error);
                console.error(error);
                alert("카카오 로그인 에러");
              });
            //db의 member_list store값 가져오는 함수 call
            getMemberInfo(email);
            //로그인버튼 글자 바꾸기
            setLoginBtn("Logout");
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
  //member_list 의 store 값 가져오기
  const getMemberInfo = async (email) => {
    const response = await axios.get(`${URL}/login?email_give=${email}`);
    const memberInfo = JSON.parse(response.data.member_info);
    const DBstoreCocktail = memberInfo[0].store;
    console.log(DBstoreCocktail);
    dispatchGetStore(DBstoreCocktail);
  };

  //로그아웃 상태일 시 내 칵테일 창고 접속 막기 - Link 태그 안에 onClick 함수.
  function loginfirst(event) {
    if (ValToken == null) {
      event.preventDefault();
      alert("로그인 먼저 해주세요😝");
    }
  }

  return (
    <div>
      <div className={styles.menu_box}>
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
            <Link to="/storage" onClick={loginfirst}>
              내 칵테일 창고
            </Link>
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

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetEmail: (email) => dispatch(getEmail(email)),
    dispatchGetStore: (array) => dispatch(getStore(array)),
    dispatchRemoveEmail: (email) => dispatch(removeEmail(email)),
    dispatchRemoveStore: (array) => dispatch(removeStore(array)),
  };
}

export default connect(null, mapDispatchToProps)(Header);
