var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var express = require("express");
var app     = express();
var path    = require("path");

app.use(express.static(__dirname + '/'));

app.get('/',function(req,res){

  res.sendFile(path.join(__dirname+'/index.html'));

  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos', function(err, coll) {
       coll.count(function(err, result){
        db.collection('youtubes').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, function(err, document) {
          console.log(document);
          console.log(document["Video UR"]);
          db.close();
        });
      });
    });
  });
});

app.listen(3000);
