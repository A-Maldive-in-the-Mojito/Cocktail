from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito
# #
# top = db.final_cocktail.find({"rank":{ "$ne":"no info"}})

# db.final_cocktail.update_many({'$and': [{"rank":{ "$ne":"no info"}},{'hashtag':"no info"}]},{'$set':{'hashtag':[]}})
db.final_cocktail.update_many({"rank":{ "$ne":"no info"}},{'$push':{'hashtag': "top100"}})
# print(top[0])