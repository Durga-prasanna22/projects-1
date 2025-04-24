const { MongoClient } = require('mongodb');
const dbUrl = 'mongodb://localhost:27017';
const client = new MongoClient(dbUrl);

async function getMongoDbConnection(userData, operationType, collectionName) {
    await client.connect();    
    const db = client.db("eGlobalShoppy");
    const collection = db.collection(collectionName);  
    // return collection.find({}).toArray();
    switch(operationType) {
        case 'find':
            return collection.find({accountId:userData.accountId}).toArray();
            break;
        case 'insert':
            return collection.insertOne(userData);
            break;
        case 'findProductDetails':
            return collection.find(userData).toArray();
            break;
        case 'addComment':
            collection.find({id: userData.id}).toArray().then((response) => {
                var productId = userData.id;
                delete userData.id;
                var existingReviews = response[0].reviews;
                existingReviews.push(userData);
                return collection.updateOne({id: productId}, {$set: {reviews: existingReviews}});
            })
            break;
        case 'addNewProduct':
            return collection.insertOne(userData);
            break;
    }   
}

module.exports = getMongoDbConnection;