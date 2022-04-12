import time

import dload
from pymongo import MongoClient
from selenium import webdriver

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

driver = webdriver.Chrome()
num =[]
#db에서 가져오기
name = db.final_cocktail.find({},{"_id":0,"name":1,"img":1})
print(name[0]["img"])

# for i in name:
#     name_cok = i["name"]
#     num.append(name_cok)
# print(len(num))     #495

# for i in name:
#     try:
#         img_link = i["img"]
#         cocktail = i["name"]
#         driver.get(img_link)
#         time.sleep(1)
#         dload.save(img_link, f"img_cocktail/{cocktail}.png")
#         # print(img_link)
#     except:
#         print("error")
#         pass

driver.quit()
