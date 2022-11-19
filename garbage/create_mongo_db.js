const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/ruoskadb";

MongoClient.connect(url, function(err, db){
    if(err) throw err;
    console.log("Ruoska Database created");
    db.close();
});