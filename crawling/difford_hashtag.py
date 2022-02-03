import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

driver = webdriver.Chrome('/usr/local/bin/chromedriver')

hashtag_list = {
    'time-for-you':'https://www.diffordsguide.com/cocktails/search?limit=15&style=62&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating](https://www.diffordsguide.com/cocktails/search?limit=80&style=62&gentle_to_boozy%5B%5D=0&gentle_to_boozy%5B%5D=10&sweet_to_sour%5B%5D=0&sweet_to_sour%5B%5D=10&calories%5B%5D=0&calories%5B%5D=9&include%5Bdg%5D=1&sort=rating',
    'house-party': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=49&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'movie-nights': 'https://www.diffordsguide.com/cocktails/search?limit=&style=34&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'christmas': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=34&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'valentines-day':'https://www.diffordsguide.com/cocktails/search?limit=15&style=31&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'new-years-eve': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=54&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'allseason-classics': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=63&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'downtown': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=63&gentle_to_boozy[]=0&gentle_to_boozy[]=10&sweet_to_sour[]=0&sweet_to_sour[]=10&calories[]=0&calories[]=9&include[dg]=1&sort=rating',
    'anniversary': 'https://www.diffordsguide.com/cocktails/search?limit=15&style=31&include%5Bdg%5D=1&sort=rating&limit=15&offset=20',
    'birthday': 'https://www.diffordsguide.com/cocktails/search?style=49&include%5Bdg%5D=1&sort=rating&limit=15&offset=20'
}

for hashtag in hashtag_list:
    driver.get(hashtag_list[hashtag])
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
                'hashtag': hashtag,
                'img': img_url,
                'booziness': booziness,
                'sweetness': sweetness,
                'ingredients': ingred_list,
                'howtomake': howtomake
            }

            # db.flavor_liquor.update_many({'name': name}, {'$set': doc})
            # db.flavor_absolute.update_many({'name': cocktail['name']}, {'$set': doc})
            # db.base_liquor.update_many({'name': cocktail['name']}, {'$set': doc})
            db.hashtag.insert_one(doc)
            print(doc)
        except:
            print(result.get_attribute('href'))
