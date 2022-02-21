from pymongo import MongoClient

client = MongoClient('mongodb+srv://mojito_maldives:cocktaillove@cluster0.yfcan.mongodb.net/Cluster0?retryWrites=true&w=majority')
db = client.dbmojito

ct_list = list(db.final_cocktail.find({},{'_id':0,'name':1, 'base':1}))

for cocktail in ct_list:
    if cocktail['base'] != 'no info':
        base_list = cocktail['base']
        new_list = []
        for base in base_list:
            if base in new_list:
                pass
            else:
                new_list.append(base)
        data = list(db.final_cocktail.find({'name': cocktail['name']}, {'_id': 0}))
        doc = {
            'name': cocktail['name'],
            'rank': data[0]['rank'],
            'base': new_list,
            'flavor': data[0]['flavor'],
            'hashtag': data[0]['hashtag'],
            'img': data[0]['img'],
            'booziness': data[0]['booziness'],
            'sweetness': data[0]['sweetness'],
            'ingredients': data[0]['ingredients'],
            'howtomake': data[0]['howtomake']
        }

        db.final_cocktail.update_many({'name': cocktail['name']}, {'$set': doc})