import appStyles from './Storage.module.css' // ../은 상위폴더
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import { useEffect } from "react";



//인가코드를 예쁘게 콘솔로그에 담았음.
// let Authcode = new URL(window.location.href).searchParams.get('code');
// console.log(Authcode);


// function GetTheToken() {
//     // 벡으로 인가코드 POST
//     const AuthToServer = async() => {
//         // let Authcode = new URL(window.location.href).searchParams.get('code');
//         axios.post('http://localhost:5000/getAuth', {
//             data: {
//                 Authcode: Authcode
//             }
//         }).then(function (response) {
//             alert("성공입니다.")
//         }).catch(function (error) {
//             alert("실패입니다.")
//         });
//     };
//     useEffect(()=> { AuthToServer()} );
    
    // 백에서 토큰 받아오기
        // const gettoken = async() => {
        //     const {data: {token}} = await axios.get('http://localhost:5000/tokens');
        //     console.log(token);
        // };
        // useEffect(()=> { gettoken()} ); 
    // }


// const kakaoLogin = (Authcode) => {
//     return function (dispatch, getState, { history }) {
//         axios({
//         method: "GET",
//         url: `http://localhost:5000/getAuth?code=${Authcode}`,
//         })
//         .then((res) => {
//           console.log(res); // 토큰이 넘어올 것임
//         })}}

function Storage() {
    // GetTheToken();
        return(
        <div className='wrapper'>
            <Link to="/desc">
                <Card />
            </Link>
        </div>
    )
}
export default Storage;
