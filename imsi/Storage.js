import appStyles from './Storage.module.css' // ../은 상위폴더
import { Link } from 'react-router-dom'
import Card from './Card.js'
import axios from "axios"
import { useEffect } from "react";



//인가코드를 예쁘게 콘솔로그에 담았음.
let Authcode = new URL(window.location.href).searchParams.get('code');
console.log(Authcode);

//app.py(서버에서 post 요청하는 code). import json,request 해야함.
// url = "https://kauth.kakao.com/oauth/token"

// data = {
//     "grant_type" : "authorization_code",
//     "client_id" : "<REST_API 앱키를 입력하세요>",
//     "redirect_uri" : "https://localhost.com",
//     "code"         : "<step2에서 발급받은 code를 입력하세요>"
    
// }
// response = requests.post(url, data=data)

// tokens = response.json()\

// 벡으로 인가코드 POST
const AuthToServer = async() => {
    // let Authcode = new URL(window.location.href).searchParams.get('code');
    axios.post('http://localhost:5000/getAuth', {
        "Authcode": Authcode
    }).then(function (response) {
        alert("성공입니다.")
    }).catch(function (error) {
        alert("실패입니다..")
    });
useEffect(()=> { AuthToServer()} );
}

// 백에서 토큰 받아오는 axios
export default function Storage() {
    const gettoken = async() => {
        const {data: {token}} = await axios.get('http://localhost:5000/tokens');
        console.log(token);
    };
    useEffect(()=> { gettoken()} );
    
    return(
        <div className='wrapper'>
            <Link to="/desc">
                <Card />
            </Link>
        </div>
    )
};
