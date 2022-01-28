import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time

from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

flavor_list = [
    {
        'flavor':'프레시',
        'link':'https://www.absolutdrinks.com/ko/drinks/tasting/fresh/',
        'click': 6
    },
    {
        'flavor':'아이써',
        'link': 'https://www.absolutdrinks.com/ko/drinks/tasting/bitter/',
        'click': 0
    },
    {
        'flavor':'프루티',
        'link': 'https://www.absolutdrinks.com/ko/drinks/tasting/fruity/',
        'click': 3
    },
    {
        'flavor':'아이셔',
        'link': 'https://www.absolutdrinks.com/ko/drinks/tasting/sour/',
        'click': 0
    },
    {
        'flavor':'허브',
        'link': 'https://www.absolutdrinks.com/ko/drinks/tasting/herb/',
        'click': 1
    }
]


driver = webdriver.Chrome('/usr/local/bin/chromedriver')
driver.get('https://www.absolutdrinks.com/ko/drinks/tasting/fresh/')
elem = driver.find_element(By.CLASS_NAME,'age-gate__input')
elem.clear()
elem.send_keys('2000')


for flavors in flavor_list:

    driver.get(flavors['link'])

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    driver.execute_script("window.scrollTo(0, 1200)")
    time.sleep(2)

    for i in range(flavors['click']):
        driver.find_element(By.CLASS_NAME,"load-more").click()
        time.sleep(3)

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    cocktails = soup.find_all("h3", class_="text-sm font-bold")
    for cocktail in cocktails[:-1]:
        doc = {
            'name': cocktail.text,
            'flavor': flavors['flavor']
        }
        print(doc)
        db.flavor_absolute.insert_one(doc)

driver.quit()