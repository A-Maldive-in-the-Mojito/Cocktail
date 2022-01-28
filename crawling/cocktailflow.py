from pymongo import MongoClient
from selenium import webdriver
from bs4 import BeautifulSoup
import time

# client = MongoClient("localhost",27017)
# db = client.cocktail

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

driver = webdriver.Chrome('/usr/local/bin/chromedriver')

keywords = ["time-for-you", "house-party","movie-nights","birthday","christmas","valentines-day","new-years-eve","beach", "anniversary","allseason-classics","downtown"]

for keyword in keywords:
    driver.get("https://cocktailflow.com/collection/" + keyword)
    driver.execute_script("window.scrollTo(0, 1200)")

    time.sleep(2)
    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    soup = BeautifulSoup(html, "html.parser")

    names = soup.select("#collection-body>ul >li")

    for name in names:
        cocktail = name.select_one("a>div>h3").text
        print(keyword,cocktail)

        doc ={
            "hashtag" : keyword,
            "cocktail" : cocktail
        }

        db.hashtag.insert_one(doc)

driver.close()
