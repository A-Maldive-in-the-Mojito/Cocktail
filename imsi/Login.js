import { KAKAO_AUTH_URL } from "./AUTH_URL";
import axios from 'axios';
import $ from 'jquery';

export default function App(){
    return (
        <div>
            <a href={ KAKAO_AUTH_URL }>
            <img style={{width:180, height:60}} src="https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png" alt =""/>
            </a>
        </div>
      )}

      // <button className="btn btn-primary" onClick={()=>{
      //
      //   axios.get('https://codingapple1.github.io/shop/data2.json')
      //   .then((result)=>{ console.log(result.data) }) // 요청 성공시 실행코드
      //   .catch(()=>{  }) // 요청 실패시 실행코드
      //   }}>더보기</button>
    //     )
    // }