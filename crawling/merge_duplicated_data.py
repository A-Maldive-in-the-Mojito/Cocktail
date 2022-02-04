from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

# flavor 데이터
ct_list = list(db.flavor.find({},{'_id':0,'name':1}))
new_list = []

for cocktail in ct_list:
    if cocktail['name'] in new_list:
        pass
    else:
        new_list.append(cocktail['name'])

for cocktail in new_list:
    data = list(db.flavor.find({'name': cocktail}, {'_id': 0}))
    flavor_list = []
    for i in range(len(data)):
        flavor_list.append(data[i]['flavor'])

    doc = {
        'name': cocktail,
        'flavor': flavor_list,
        'img': data[0]['img'],
        'booziness': data[0]['booziness'],
        'sweetness': data[0]['sweetness'],
        'ingredients': data[0]['ingredients'],
        'howtomake': data[0]['howtomake']
    }

    db.test_ek.insert_one(doc)


# hashtag 데이터
ct_list = list(db.hashtag.find({},{'_id':0,'name':1}))
new_list = []

for cocktail in ct_list:
    if cocktail['name'] in new_list:
        pass
    else:
        new_list.append(cocktail['name'])

for cocktail in new_list:
    data = list(db.hashtag.find({'name': cocktail}, {'_id': 0}))
    hashtag_list = []
    for i in range(len(data)):
            hashtag_list.append(data[i]['hashtag'])

    doc = {
        'name': cocktail,
        'hashtag': hashtag_list,
        'img': data[0]['img'],
        'booziness': data[0]['booziness'],
        'sweetness': data[0]['sweetness'],
        'ingredients': data[0]['ingredients'],
        'howtomake': data[0]['howtomake']
    }

    db.test_ek.insert_one(doc)


# base 데이터
ct_list = list(db.base.find({},{'_id':0,'name':1}))
new_list = []

for cocktail in ct_list:
    if cocktail['name'] in new_list:
        pass
    else:
        new_list.append(cocktail['name'])

for cocktail in new_list:
    data = list(db.base.find({'name': cocktail}, {'_id': 0}))
    base_list = []
    for i in range(len(data)):
            base_list.append(data[i]['base'])
    else:
        base_list.append(data[0]['base'])

    doc = {
        'name': cocktail,
        'base': base_list,
        'img': data[0]['img'],
        'booziness': data[0]['booziness'],
        'sweetness': data[0]['sweetness'],
        'ingredients': data[0]['ingredients'],
        'howtomake': data[0]['howtomake']
    }

    db.test_ek.insert_one(doc)