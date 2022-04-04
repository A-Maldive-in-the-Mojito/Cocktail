const CLIENT_ID = "f7b88ddd4ef9dae165bb00a4bd660fe3"
const REDIRECT_URI = "http://localhost:3000/storage"

export const KAKAO_AUTH_URL=`https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;