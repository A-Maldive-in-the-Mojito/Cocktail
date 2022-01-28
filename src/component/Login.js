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
        </div>
    );
}