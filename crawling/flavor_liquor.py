import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

flavor_list = {
                '아이써': 'https://www.liquor.com/bitter-cocktails-4779386',
                '프루티': 'https://www.liquor.com/fruity-cocktails-4779381',
                '아이셔': 'https://www.liquor.com/sour-cocktails-4779383',
                '스모키': 'https://www.liquor.com/smoky-cocktails-4779380',
                '허브': 'https://www.liquor.com/herbaceous-cocktails-4779377'
            }
def isCocktail(cocktails):
    for cocktail in cocktails:
        name = cocktail.text.split('\n')[1]
        if 'to ' in name or 'for ' in name:
            pass
        else:
            doc = {
                'name': name,
                'flavor': flavor
            }
            print(doc)
            db.flavor_liquor.insert_one(doc)

#flavor 페이지마다 크롤링
for flavor in flavor_list:
    data = requests.get(flavor_list[flavor])
    soup = BeautifulSoup(data.text, 'html.parser')
    cocktails = soup.find("div", class_="comp spotlight__secondary-list card-list mntl-block").find_all("span", class_="card__underline")
    isCocktail(cocktails)

    cocktails = soup.find("div", id="card-list_1-0").find_all("span", class_="card__underline")
    isCocktail(cocktails)