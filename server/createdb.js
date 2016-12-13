var MongoClient = require('mongodb').MongoClient;
var sha = require('sha256');

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if (err) { return console.dir(err); }
  MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
    if(err) { return console.dir(err); }
    var collection = db.collection('users');
  /*  var user = {
        name: 'arvind',
        role: 'user',
        username: 'arvind@myapp.com',
        password: sha('arvindPassword')
        }
    var admin = {
        name: 'maksim',
        role: 'admin',
        username: 'maksim@myapp.com',
        password: sha('maksimPassword')
        }

    collection.insert(user);
    collection.insert(admin);*/
    collection.findOne({name:'maksim', password: sha('maksimPassword')}, function(err, item) {
       console.log(item); 
    });
    });
});
