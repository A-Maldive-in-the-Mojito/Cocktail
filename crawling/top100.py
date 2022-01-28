import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

page_list = ['1-20', '21-40', '41-60', '61-80', '81-100']
ct_list = []


# Top100 페이지마다 칵테일 리스트, 등수, 상세 페이지 링크 정보 가져오기
for page in page_list:
    data = requests.get(f'https://www.diffordsguide.com/g/1127/worlds-top-100-cocktails/{page}')
    soup = BeautifulSoup(data.text, 'html.parser')

    cocktails = soup.find("div", class_="long-form").find_all("p")
    for cocktail in cocktails:
        rank = cocktail.get_text(strip=True).split('.')[0]
        name = cocktail.get_text(strip=True).split('.')[1].split('-')[0]
        link = cocktail.select_one('a')['href']

        ct_list.append({
            'rank': rank,
            'name': name,
            'link': f'https://www.diffordsguide.com{link}'
        })

# 링크가 바로 뜨지 않는 항목들
ct_list[9]['link'] = 'https://www.diffordsguide.com/cocktails/recipe/472/cosmopolitan-cocktail-diffords-recipe'
ct_list[17]['link'] = 'https://www.diffordsguide.com/cocktails/recipe/1427/old-fashioned-cocktail-diffords-recipe'
ct_list[24]['link'] = 'https://www.diffordsguide.com/cocktails/recipe/1341/mojito-cocktail'
ct_list[34]['link'] = 'https://www.diffordsguide.com/cocktails/recipe/127/aviation-cocktail-diffords-recipe'
ct_list[57]['link'] = 'https://www.diffordsguide.com/cocktails/recipe/354/caipirinha'

print('done')


# 칵테일 상세 정보 가져오기
for cocktail in ct_list:

    ct_data = requests.get(cocktail['link'])
    ct_soup = BeautifulSoup(ct_data.text, 'html.parser')

    # 칵테일 재료 : { 양, 재료 종류 }의 딕셔너리 형태로 저장
    ingredients = ct_soup.find("table", class_="ingredients-table").find_all("td", class_="td-align-top")
    ingred_list = []
    for i in range(int(len(ingredients)/2)):
        ingred_list.append({
            '양': ingredients[2 * i].get_text(strip=True),
            '재료': ingredients[2 * i + 1].get_text(strip=True)
        })
    # 칵테일 제조방법 : 문단 전체를 가져옴
    howtomake = ct_soup.select_one('#sticky-anchor > div > div > div.cell.auto.divide-right-large > div > article > div > div:nth-child(3) > p').text

    # 이미지 링크
    img_url = ct_soup.find("div", class_="cell small-12 notch notch--collapse-medium medium-12 large-auto").find("img")['src']

    # 알콜, 당도 : 정보 있으면 가져오고 없으면 'no info'로 저장
    if (ct_soup.find_all("div", class_="svg-range")):
        svgs = ct_soup.find_all("div", class_="svg-range")
        booziness = svgs[0].select_one('img')['alt']
        sweetness = svgs[1].select_one('img')['alt']
    else:
        booziness = 'no info'
        sweetness = 'no info'

    doc = {
        'rank': cocktail['rank'],
        'name': cocktail['name'],
        'img': img_url,
        'booziness': booziness,
        'sweetness': sweetness,
        'ingredients': ingred_list,
        'howtomake': howtomake
    }
    db.top100_imsi.insert_one(doc)