import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

driver = webdriver.Chrome('/usr/local/bin/chromedriver')

flavor_list = {
    '프레시':'https://www.diffordsguide.com/cocktails/search?style=59&gentle_to_boozy%5B%5D=0&gentle_to_boozy%5B%5D=10&sweet_to_sour%5B%5D=0&sweet_to_sour%5B%5D=10&calories%5B%5D=0&calories%5B%5D=9&include%5Bdg%5D=1&sort=rating&limit=35',
    '아이써': 'https://www.diffordsguide.com/cocktails/search?style=38&sweet_to_sour%5B%5D=7&sweet_to_sour%5B%5D=10&include%5Bdg%5D=1&sort=rating&limit=30&offset=0',
    '프루티': 'https://www.diffordsguide.com/cocktails/search?style=23&gentle_to_boozy%5B%5D=0&gentle_to_boozy%5B%5D=10&sweet_to_sour%5B%5D=0&sweet_to_sour%5B%5D=10&calories%5B%5D=0&calories%5B%5D=9&include%5Bdg%5D=1&sort=rating&limit=20',
    '아이셔': 'https://www.diffordsguide.com/cocktails/search?style=45&gentle_to_boozy%5B%5D=0&gentle_to_boozy%5B%5D=10&sweet_to_sour%5B%5D=0&sweet_to_sour%5B%5D=10&calories%5B%5D=0&calories%5B%5D=9&include%5Bdg%5D=1&sort=rating&limit=20',
    '허브':'https://www.diffordsguide.com/cocktails/search?style=56&gentle_to_boozy%5B%5D=0&gentle_to_boozy%5B%5D=10&sweet_to_sour%5B%5D=0&sweet_to_sour%5B%5D=10&calories%5B%5D=0&calories%5B%5D=9&include%5Bdg%5D=1&sort=rating&limit=30'
}

for flavor in flavor_list:
    driver.get(flavor_list[flavor])
    result_list = driver.find_elements(By.CSS_SELECTOR, '#search-form > div > a')
    for result in result_list:
        name = result.text.split('\n')[0]
        if '(' in name:
            name = name.split(' (')[0]
        print(name)
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
                'name': name,
                'flavor': flavor,
                'img': img_url,
                'booziness': booziness,
                'sweetness': sweetness,
                'ingredients': ingred_list,
                'howtomake': howtomake
            }

            # db.flavor_liquor.update_many({'name': name}, {'$set': doc})
            # db.flavor_absolute.update_many({'name': cocktail['name']}, {'$set': doc})
            # db.base_liquor.update_many({'name': cocktail['name']}, {'$set': doc})
            db.flavor_absolute.insert_one(doc)
            print(doc)
        except:
            print(result.get_attribute('href'))
