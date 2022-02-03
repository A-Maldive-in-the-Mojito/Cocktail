from pymongo import MongoClient
from operator import itemgetter

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

ct_list = list(db.flavor.find({},{'_id':0}))
for cocktail in ct_list:
    db.test_ek.insert_one(cocktail)
print("맛")

ct_list = list(db.hashtag.find({},{'_id':0}))
for cocktail in ct_list:
    db.test_ek.insert_one(cocktail)
print("해시")

ct_list = list(db.top100.find({},{'_id':0}))
for cocktail in ct_list:
    db.test_ek.insert_one(cocktail)
print("탑백")

ct_list = list(db.test_ek.find({},{'_id':0}))
sorted_list = sorted(ct_list, key=itemgetter('name'))
print("분류")

for cocktail in sorted_list:
    db.test_ek2.insert_one(cocktail)

# print(sorted_list)
# for cocktail in ct_list:
#     print(cocktail[0])