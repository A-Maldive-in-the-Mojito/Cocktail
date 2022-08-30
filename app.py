from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request, send_from_directory, redirect
from flask_cors import CORS
from bson.json_util import dumps

app = Flask(__name__, static_folder='./public') # html.index 가 있는 폴더 연결
CORS(app) # 리액트(3000)랑 파이썬(5000) 주소 오류제거



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
    cocktails = list(db.final_cocktail_real.find({}))
    return jsonify({'all_cocktails': dumps(cocktails)})

# 이모지
@app.route('/emojis', methods=['GET'])
def emoji():
    emojis = list(db.emoji.find({}))
    return jsonify({'emojis': dumps(emojis)})



# 로그인
@app.route('/login', methods=['POST','GET'])
def saving():
    if request.method == 'POST':
        datas = request.get_json()
        email_receive = datas['email_give']
        data = db.member_list.find({"email": email_receive})
        if len(list(data)) == 0:
            name_receive = datas['name_give']
            img_receive = datas['img_give']
            doc = {
                'email': email_receive,
                'name': name_receive,
                'img': img_receive,
                'store': [""]
            }
            db.member_list.insert_one(doc)

            return jsonify({'msg':'회원가입을 축하합니다!'})
        return jsonify({'msg':'로그인 완료!'})
    else:
        email_receive = request.args.get('email_give')
        print(email_receive,"이메일")
        member_info = list(db.member_list.find({"email": email_receive}))
        print(member_info,"얍")
        # member_id = str(member_info[0]['_id'])
        # print(member_id,"아이디")
        return jsonify({'member_info': dumps(member_info)})

# 즐겨찾기
@app.route('/favourite', methods=['POST'])
def like():
    data = request.get_json()
    email_receive = data['email_give']
    name_receive = data['name_give']
    checked_receive = data['checked_give']
    print(email_receive, name_receive, checked_receive)

    if checked_receive == 1:
        db.member_list.update_one({'email': email_receive}, {
            '$push': {'store': name_receive}})

        return jsonify({'msg': '즐겨찾기 완료!'})
    else:
        db.member_list.update_one({'email': email_receive}, {
            '$pull': {'store': name_receive}})
        return jsonify({'msg': '즐겨찾기를 취소하였습니다.'})


if __name__ == '__main__':
    app.debug = True
    app.run('0.0.0.0', port=5000, debug=True)
