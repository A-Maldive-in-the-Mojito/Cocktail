const CLIENT_ID = "9ce199aa00b6ee21df315b23167c781d"
const REDIRECT_URI = "http://127.0.0.1:3000/oauth"
// const REDIRECT_URI = "http://127.0.0.1:5000/oauth"
export const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;