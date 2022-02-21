from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito
#
# # 1번째 (base + flavor)
#
# # 현재 입력되어있는 데이터
# now_list = list(db.cocktail.find({},{'_id':0,'name':1}))
#
# # 추가 해야할 데이터
# add_list = list(db.final_flavor.find({},{'_id':0,'name':1}))
#
# new_list = []
#
# for cocktail in add_list:
#     if cocktail in now_list:
#         pass
#     else:
#         new_list.append(cocktail['name'])
#
# for cocktail in new_list:
#     data = list(db.final_flavor.find({'name': cocktail}, {'_id': 0}))
#     doc = {
#         'name': cocktail,
#         'base': 'no info',
#         'flavor': data[0]['flavor'],
#         'img': data[0]['img'],
#         'booziness': data[0]['booziness'],
#         'sweetness': data[0]['sweetness'],
#         'ingredients': data[0]['ingredients'],
#         'howtomake': data[0]['howtomake']
#     }
#
#     db.cocktail.insert_one(doc)
#
# new_list = []
#
# for cocktail in now_list: #현재 입력되어 있는 데이터 중에 flavor에 없는 애들만
#     if cocktail in add_list:
#         pass
#     else:
#         new_list.append(cocktail['name'])
#
# for cocktail in new_list:
#     data = list(db.cocktail.find({'name': cocktail}, {'_id': 0}))
#     doc = {
#         'name': cocktail,
#         'base': data[0]['base'],
#         'flavor': 'no info',
#         'img': data[0]['img'],
#         'booziness': data[0]['booziness'],
#         'sweetness': data[0]['sweetness'],
#         'ingredients': data[0]['ingredients'],
#         'howtomake': data[0]['howtomake']
#     }
#
#     db.cocktail.update_many({'name': cocktail}, {'$set': doc})


# # 2번쨰 (hashtag 추가)
#
# # 현재 입력되어있는 데이터
# now_list = list(db.cocktail2.find({},{'_id':0,'name':1}))
#
# # 추가 해야할 데이터
# add_list = list(db.final_hashtag.find({},{'_id':0,'name':1}))
#
# new_list = []
#
# for cocktail in add_list:
#     if cocktail in now_list:
#         pass
#     else:
#         new_list.append(cocktail['name'])
#
# for cocktail in new_list:
#     data = list(db.final_hashtag.find({'name': cocktail}, {'_id': 0}))
#     doc = {
#         'name': cocktail,
#         'base': 'no info',
#         'flavor': 'no info',
# 		'hashtag': data[0]['hashtag'],
#         'img': data[0]['img'],
#         'booziness': data[0]['booziness'],
#         'sweetness': data[0]['sweetness'],
#         'ingredients': data[0]['ingredients'],
#         'howtomake': data[0]['howtomake']
#     }
#
#     db.cocktail2.insert_one(doc)
#
# new_list = []
#
# for cocktail in now_list: #현재 입력되어 있는 데이터 중에 flavor에 없는 애들만
#     if cocktail in add_list:
#         pass
#     else:
#         new_list.append(cocktail['name'])
#
# for cocktail in new_list:
#     data = list(db.cocktail2.find({'name': cocktail}, {'_id': 0}))
#     doc = {
#         'name': cocktail,
#         'base': data[0]['base'],
# 		'flavor': data[0]['flavor'],
#         'hashtag': 'no info',
#         'img': data[0]['img'],
#         'booziness': data[0]['booziness'],
#         'sweetness': data[0]['sweetness'],
#         'ingredients': data[0]['ingredients'],
#         'howtomake': data[0]['howtomake']
#     }
#
#     db.cocktail2.update_many({'name': cocktail}, {'$set': doc})


# 3번쨰 (top100 추가)

# 현재 입력되어있는 데이터
now_list = list(db.final_cocktail.find({},{'_id':0,'name':1}))

# 추가 해야할 데이터
add_list = list(db.top100.find({},{'_id':0,'name':1}))

new_list = []

for cocktail in add_list:
    if cocktail in now_list:
        pass
    else:
        new_list.append(cocktail['name'])

for cocktail in new_list:
    data = list(db.top100.find({'name': cocktail}, {'_id': 0}))
    doc = {
        'name': cocktail,
		'rank': data[0]['rank'],
        'base': 'no info',
        'flavor': 'no info',
		'hashtag': 'no info',
        'img': data[0]['img'],
        'booziness': data[0]['booziness'],
        'sweetness': data[0]['sweetness'],
        'ingredients': data[0]['ingredients'],
        'howtomake': data[0]['howtomake']
    }

    db.final_cocktail.insert_one(doc)

new_list = []

for cocktail in now_list: #현재 입력되어 있는 데이터 중에 flavor에 없는 애들만
    if cocktail in add_list:
        pass
    else:
        new_list.append(cocktail['name'])

for cocktail in new_list:
    data = list(db.final_cocktail.find({'name': cocktail}, {'_id': 0}))
    doc = {
        'name': cocktail,
		'rank': 'no info',
        'base': data[0]['base'],
		'flavor': data[0]['flavor'],
        'hashtag': data[0]['hashtag'],
        'img': data[0]['img'],
        'booziness': data[0]['booziness'],
        'sweetness': data[0]['sweetness'],
        'ingredients': data[0]['ingredients'],
        'howtomake': data[0]['howtomake']
    }

    db.final_cocktail.update_many({'name': cocktail}, {'$set': doc})