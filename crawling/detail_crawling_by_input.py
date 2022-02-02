import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

while True:
    name = input("칵테일 이름 입력(데이터베이스 기준)")
    if name == 'q':
        break
    url = input("크롤링할 페이지 주소 입력")


    ct_data = requests.get(url)
    ct_soup = BeautifulSoup(ct_data.text, 'html.parser')

    try:
        # 칵테일 재료 : { 양, 재료 종류 }의 딕셔너리 형태로 저장
        ingredients = ct_soup.find("table", class_="ingredients-table").find_all("td", class_="td-align-top")
        ingred_list = []
        for i in range(int(len(ingredients) / 2)):
            ingred_list.append({
                '양': ingredients[2 * i].get_text(strip=True),
                '재료': ingredients[2 * i + 1].get_text(strip=True)
            })
        # 칵테일 제조방법 : 문단 전체를 가져옴
        howtomake = ct_soup.select_one(
            '#sticky-anchor > div > div > div.cell.auto.divide-right-large > div > article > div > div:nth-child(3) > p').text

        # 이미지 링크
        img_url = ct_soup.find("div", class_="cell small-12 notch notch--collapse-medium medium-12 large-auto").find("img")[
            'src']

        # 알콜, 당도 : 정보 있으면 가져오고 없으면 'no info'로 저장
        if (ct_soup.find_all("div", class_="svg-range")):
            svgs = ct_soup.find_all("div", class_="svg-range")
            booziness = svgs[0].select_one('img')['alt']
            sweetness = svgs[1].select_one('img')['alt']
        else:
            booziness = 'no info'
            sweetness = 'no info'

        doc = {
            'img': img_url,
            'booziness': booziness,
            'sweetness': sweetness,
            'ingredients': ingred_list,
            'howtomake': howtomake
        }

        db.flavor_liquor.update_many({'name': name}, {'$set': doc})
        print('성공')
        # db.flavor_absolute.update_many({'name': name}, {'$set': doc})
    except:
        print('실패, 입력값 확인')
