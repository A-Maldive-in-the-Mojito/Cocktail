from pymongo import MongoClient
from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import requests
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

driver = webdriver.Chrome()


links = [{"base": "tequila", "url" :"https://www.diffordsguide.com/g/1162/cocktails-made-easy/tequila-blanco-or-reposado"},
         {"base":"vodka", "url":"https://www.diffordsguide.com/g/1162/cocktails-made-easy/vodka-recipes"},
         {"base" : "rum", "url":"https://www.diffordsguide.com/g/1162/cocktails-made-easy/white-or-gold-light-rum-recipes"},
         {"base": "gin", "url":"https://www.diffordsguide.com/g/1162/cocktails-made-easy/gin-recipes"},
         {"base" : "brandy", "url" :"https://www.diffordsguide.com/g/1162/cocktails-made-easy/cognac-or-brandy-recipes"}
    ]

cocktails =[]
#링크 추출
for i in links:
    data = requests.get(i["url"])
    soup = BeautifulSoup(data.text, 'html.parser')
    link = soup.select("#sticky-anchor > div.cell.large-8.medium-9.small-12 > div > div.grid-margin-x.grid-padding-y.grid-x > a")
    base = i["base"]
    for a in link:
        cocktail_link = a.attrs["href"]
        # print(cocktail_link)
        cocktails.append({ "base" : base,
                            "urls"  : "https://www.diffordsguide.com" + cocktail_link})
print(cocktails)

for i in cocktails:
    data = requests.get(i["urls"])
    soup = BeautifulSoup(data.text, 'html.parser')
    #칵테일 이름
    name = soup.find("h1", class_="strip__heading").text
    #베이스
    cock_base = i["base"]
    # 칵테일 재료 : { 양, 재료 종류 }의 딕셔너리 형태로 저장
    ingredients = soup.find("table", class_="ingredients-table").find_all("td", class_="td-align-top")
    ingred_list = []
    for i in range(int(len(ingredients) / 2)):
        ingred_list.append({
            '양': ingredients[2 * i].get_text(strip=True),
            '재료': ingredients[2 * i + 1].get_text(strip=True)
        })
    # 칵테일 제조방법 : 문단 전체를 가져옴
    howtomake = soup.select_one(
        '#sticky-anchor > div > div > div.cell.auto.divide-right-large > div > article > div > div:nth-child(3) > p').text

    # 이미지 링크
    img_url = soup.find("div", class_="cell small-12 notch notch--collapse-medium medium-12 large-auto").find("img")[
        'src']

    # 알콜, 당도 : 정보 있으면 가져오고 없으면 'no info'로 저장
    if (soup.find_all("div", class_="svg-range")):
        svgs = soup.find_all("div", class_="svg-range")
        booziness = svgs[0].select_one('img')['alt']
        sweetness = svgs[1].select_one('img')['alt']
    else:
        booziness = 'no info'
        sweetness = 'no info'

    doc = {
        'name': name,
        'base' : cock_base,
        'img': img_url,
        'booziness': booziness,
        'sweetness': sweetness,
        'ingredients': ingred_list,
        'howtomake': howtomake
    }

    db.base.insert_one(doc)