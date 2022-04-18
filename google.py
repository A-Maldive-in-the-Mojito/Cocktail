from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito


# list(db.final_cocktail.aggregate([{"$group":{ "_id": "$name", "count": { "$sum": 1 } } }]))
desc = list(db.D.find({}, {'_id': 1, 'howtomake': 1}))
# print(desc)
# howtomake = list(db.final_cocktail.distinct('howtomake'))
# print(howtomake[0])

# n = 0
# while n < 180:
#     doc = {
#         '_id' : n,
#         'howtomake' : howtomake[n] ,
#     }
#
#     print(doc)
#     db.D.insert_one(doc)
#     n = n + 1



# 셀레니움
# n = 0
# while n < 173:
#
#     n = desc[n]['_id']
#     d = desc[n]['howtomake']
#     print(n)
#
#     driver = webdriver.Chrome('/Users/suwanpark/Documents/CODE/selenium_prac/chromedriver')
#     driver.get("https://translate.google.co.kr/?hl=ko")
#     try:
#         # time.sleep(1)
#         element = driver.find_element(By.XPATH, "//*[@id='yDmH0d']/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[3]/c-wiz[1]/span/span/div/textarea")
#         element.send_keys(d)
#         time.sleep(3)
#         a = driver.find_element(By.XPATH,"//*[@id='yDmH0d']/c-wiz/div/div[2]/c-wiz/div[2]/c-wiz/div[1]/div[2]/div[3]/c-wiz[2]/div[6]/div/div[1]/span[1]")
#         print(a.text)
#
#         db.D.update_one({'_id':n},{'$set' : {"korean": a.text}})
#         n = n + 1
#
#     except:
#         print(n, '오류입니다.')
#         pass


