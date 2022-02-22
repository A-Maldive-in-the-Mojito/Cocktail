import axios from "axios";
import $ from "jquery";
export default function Login() {
    return (
        <div>
            <form>
                <h1>로그인하세요</h1>
                <input type="text" placeholder="ID"></input>
                <input type="password" placeholder="PASSWORD"></input>
                <button>Login</button>
            </form>
            {/* 로그인 했을때 보이도록 */}
            <button id="logout" class="hidden">Log out</button>
            
            {/*<p><button onClick={() => {*/}

            {/*    axios.get('/search')*/}
            {/*        .then((result) => { console.log(result.data) }) // 요청 성공시 실행코드*/}
            {/*        .catch(() => { }) // 요청 실패시 실행코드*/}

            {/*}}>더보기</button></p>*/}

        </div>
    );
}