
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var express = require("express");
var app     = express();
var path    = require("path");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){
  var randomID;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos', function(err, coll) {
       coll.count(function(err, result){
        db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, function(err, document) {
          console.log(result);
          console.log(document);
          randomID = document["Video UR"];
          console.log(randomID);
          db.close();
          res.render(path.join(__dirname+'/index'), { videoID: randomID});
        });
      });
    });
  });
});

app.get('/api/getvid',function(req,res){
  var randomID;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos', function(err, coll) {
       coll.count(function(err, result){
        db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, function(err, document) {
          randomID = document["Video UR"];
          console.log(randomID);
          db.close();
          res.json({id: randomID});
        });
      });
    });
  });
});

app.listen(80);
