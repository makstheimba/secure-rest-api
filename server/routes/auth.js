var jwt = require('jwt-simple');
var MongoClient = require('mongodb').MongoClient;
var sha = require('sha256');

var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';    

    if (username == '' || password == '') {
      auth.authFail(res);
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(username, password, res);
 
  },
 
  validate: function(username, password, res) {
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
      if (err) {
        res.status(404);
        res.json({
          "status": 404,
          "message": "Can't connect to database"
        });
        return ;
      }
      var collection = db.collection('users');
      collection.findOne({name: username, password: sha(password)}, function (err, dbUserObj){
        if (err || !dbUserObj) {
          auth.authFail(res);
        } else {
          res.json(genToken(dbUserObj.name));
        }
      });
    });
  },
 
  validateUser: function(username, callback) {
    MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
      if (err) {
        callback(null);
        return ;
      }
      var collection = db.collection('users');
      collection.findOne({name: username}, function (err, dbUserObj){
        if (err || !dbUserObj) {
          callback(null)
        } else {
          callback(dbUserObj);
        }
      });
    });
  },

  authFail(res) {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid credentials"
    });
  }
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    user: user
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;