import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
import time

from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

flavor_list = {
                '프레시': 'https://www.absolutdrinks.com/ko/drinks/tasting/fresh/',
                '아이써': 'https://www.absolutdrinks.com/ko/drinks/tasting/bitter/',
                '프루티': 'https://www.absolutdrinks.com/ko/drinks/tasting/fruity/',
                '아이셔': 'https://www.absolutdrinks.com/ko/drinks/tasting/sour/',
                '허브': 'https://www.absolutdrinks.com/ko/drinks/tasting/herb/'
            }


driver = webdriver.Chrome('/usr/local/bin/chromedriver')
driver.get('https://www.absolutdrinks.com/ko/drinks/tasting/fresh/')
elem = driver.find_element(By.CLASS_NAME,'age-gate__input')
elem.clear()
elem.send_keys('2000')


for flavor in flavor_list:

    driver.get(flavor_list[flavor])

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    driver.execute_script("window.scrollTo(0, 1200)")
    time.sleep(2)

    while True:
        try:
            driver.find_element(By.CLASS_NAME, "load-more").click()
            time.sleep(2)
        except:
            break

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    cocktails = soup.find_all("h3", class_="text-sm font-bold")
    for cocktail in cocktails[:-1]:
        doc = {
            'name': cocktail.text,
            'flavor': flavor
        }
        print(doc)
        db.flavor_absolute.insert_one(doc)

driver.quit()