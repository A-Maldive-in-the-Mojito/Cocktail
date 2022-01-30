import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from pymongo import MongoClient
import time

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

ct_list = list(db.flavor_liquor.find({},{'_id':0,'name':1}))
# ct_list = list(db.flavor_absolute.find({},{'_id':0,'name':1}))

driver = webdriver.Chrome('/usr/local/bin/chromedriver')

for cocktail in ct_list:
    name = cocktail['name']
    driver.get(f"https://www.diffordsguide.com/search?q={name}")
    results = driver.find_elements(By.CSS_SELECTOR, 'div.cell.small-12 > div.grid-x.grid-margin-x > div > ul > li > a')
    for result in results:
        # print(result.text)
        if result.text.replace(' ', '').lower() == name.replace(' ', '').lower() or result.text.replace(' ', '').lower() == name.replace(' ', '').lower() + 'cocktail':
            ct_data = requests.get(result.get_attribute('href'))
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

                # db.flavor_liquor.update_many({'name': name}, {'$set': doc})
                db.flavor_absolute.update_many({'name': name}, {'$set': doc})
            except:
                print(result.get_attribute('href'))
        else:
            pass
