from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, send_from_directory
import json
from flask_cors import CORS
# from app import app

from config import CLIENT_ID, REDIRECT_URI
from controller import Oauth

app = Flask(__name__, static_folder='./public') # html.index 가 있는 폴더 연결
CORS(app) # 리액트(3000)랑 파이썬(5000) 주소 오류제거

client = MongoClient('mongodb://dice:dice4@15.164.214.224/', 27017)

# mojoto db 주소 인식안됨
client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito


# html 연결
@app.route('/')
def connect():
    # return render_template('index.html')
    return send_from_directory(app.static_folder, 'index.html')

# 칵테일
@app.route('/cocktails', methods=['GET'])
def cocktail():
    cocktails = list(db.base.find({}, {'_id': False}))
    return jsonify({'all_cocktails': cocktails})

# storage.js 에서 post한 인가코드 받아오는 코드
# @app.route("/code", methods=['POST'])
# def auth():
#     code_receive = request.form['code_give']
#     print(code_receive)
    # return ({'tokens': response})
#
#
#     url = "https://kauth.kakao.com/oauth/token"
#     data = {
#         "grant_type": "authorization_code",
#         "client_id": "f7b88ddd4ef9dae165bb00a4bd660fe3",
#         "redirect_uri": "http://localhost:3000/storage",
#         "code": code_receive
#     }
#     response = request.post(url, data=data)
#     tokens = response.json()
#     print(tokens)
#

# @app.route('/oauth/url')
# def oauth_url_api():
#     """
#     Kakao OAuth URL 가져오기
#     """
#     return jsonify(
#         kakao_oauth_url="https://kauth.kakao.com/oauth/authorize?client_id=%s&redirect_uri=%s&response_type=code" \
#         % (CLIENT_ID, REDIRECT_URI)
#     )


백에서 인가코드-토큰 받기
@app.route("/oauth")
def oauth_api():
   # 사용자로부터 authorization code를 인자로 받음
    code = str(request.args.get('code'))

    print(code)

    # 전달받은 authorization code를 통해서 access_token, refresh_token을발급
    oauth = Oauth()
    auth_info = oauth.auth(code)
    print(auth_info)


    user = oauth.userinfo("Bearer " + auth_info['access_token'])
    #몽고db넣기

    print(user)


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)