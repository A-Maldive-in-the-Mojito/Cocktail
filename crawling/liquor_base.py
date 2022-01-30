import requests
from bs4 import BeautifulSoup

from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito


db = client.cocktail
base_list = {
                'tequila': 'https://www.liquor.com/tequila-and-mezcal-4779374',
                'vodka': 'https://www.liquor.com/vodka-4779373',
                'rum': 'https://www.liquor.com/rum-4779372',
                'gin': 'https://www.liquor.com/gin-4779369',
                'whiskey': 'https://www.liquor.com/rye-whiskey-4779366',
                'brandy' : 'https://www.liquor.com/brandy-4779364',
            }
def isCocktail(cocktails):
    for cocktail in cocktails:
        name = cocktail.text.split('\n')[1]
        if 'to ' in name or 'for ' in name or 'Review' in name or 'the ' in name or '6' in name or \
                'on ' in name or 'Is' in name or 'Why' in name or 'if' in name  :
            pass
        else:
            doc = {
                'name': name,
                'base': base
            }
            print(doc)
            db.base_liquor.insert_one(doc)

#페이지마다 크롤링
for base in base_list:
    data = requests.get(base_list[base])
    soup = BeautifulSoup(data.text, 'html.parser')
    cocktails = soup.find("div", class_="comp spotlight__secondary-list card-list mntl-block").find_all("span", class_="card__underline")
    isCocktail(cocktails)

    cocktails = soup.find_all("span", class_="card__underline")
    isCocktail(cocktails)





