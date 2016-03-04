
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
    db.collection('videos').count(function(err, result){
      db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, { "vidID": 1, _id:0 }, function(err, document) {
        db.close();
        res.render(path.join(__dirname+'/index'), { videoID: document["vidID"]});
      });
    });
  });
});

app.get('/api/randomvid',function(req,res){
  var randomID;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos').count(function(err, result){
      db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, { "vidID": 1, _id:0 }, function(err, document) {
        db.close();
        res.json(document);
      });
    });
  });
});


// get up to 50 videos at once
app.get('/api/getvidsfrom/:start/:end', function(req, res, next) {
  var start_id = parseInt(req.params.start);
  var end_id = parseInt(req.params.end);
  var len = end_id - start_id + 1;
  if(len > 50)
  {
    len = 50;
  }
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos', function(err, coll) {
      coll.count(function(err, result){
        db.collection('videos').find({_id: {$gte: start_id }}, { "vidID": 1, _id:0 }).limit(len).toArray(  function(err, document) {
          db.close();
          res.json(document);
        });
      });
    });
  });
});

app.get('/admin',function(req,res){
  res.render(path.join(__dirname+'/admin'));
});

app.listen(80);
