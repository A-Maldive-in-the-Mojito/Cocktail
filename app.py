from pymongo import MongoClient
from flask import Flask, render_template, jsonify, send_from_directory
import requests

from flask_cors import CORS


app = Flask(__name__, static_folder='./public') # html.index 가 있는 폴더 연결
CORS(app) # 리액트(3000)랑 파이썬(5000) 주소 오류제거


# mojoto db 주소 인식안됨
client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
# db = client.list_number_2
db = client.dbmojito


# html 연결
@app.route('/')
def connect():
    # return render_template('index.html')
    return send_from_directory(app.static_folder, 'index.html')

# 브로드보드 gamelist
# @app.route('/search', methods=['GET'])
# def view_games():
#     games = list(db.gamelist.find({}, {'_id': False}))
#     return jsonify({'all_games': games})

# 칵테일
@app.route('/cocktails', methods=['GET'])
def cocktail():
    cocktails = list(db.base.find({}, {'_id': False}))
    return jsonify({'all_cocktails': cocktails})

# storage.js 에서 post한 인가코드 받아오는 코드
@app.route("/getAuth", methods=['POST'])
def GETAUTH():

    return ({'tokens': response})

url = "https://kauth.kakao.com/oauth/token"

data = {
    "grant_type": "authorization_code",
    "client_id": "f7b88ddd4ef9dae165bb00a4bd660fe3",
    "redirect_uri": "http://localhost:3000/storage",
    "code": "jRy6IaZEBlOJQOViUcWGYEiHkD97dk19pMNmf4fWJKPp_6JtB5BFGJJTdnQGwE2miCj-WQorDNMAAAF_LA6pqg"
}
response = requests.post(url, data=data)

tokens = response.json()

@app.route('/tokens', methods=['GET'])
def Tokens():
    token = tokens
    return ({'token': token})

print(tokens)
if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)