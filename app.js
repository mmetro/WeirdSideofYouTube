
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';

var express = require("express");
var app     = express();
var path    = require("path");

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));


// NOTE: if we add or remove videos, how will we handle this?
// Should we keep track of it on our own, or should we make a call to MongoDB each time?
// I'm thinking that we should make the MongoDB call each time a video is added/removed
var smallestID = 0
var largestID = 0

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.collection('videos').find({}, { _id: 1 }).sort({_id: 1}).limit(1).next( function(err, document) {
    smallestID = document["_id"];
    console.log("Smallest _id:");
    console.log(smallestID);
    db.close();
  });
});
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  db.collection('videos').find({}, { _id: 1 }).sort({_id: -1}).limit(1).next( function(err, document) {
    largestID = document["_id"];
    console.log("Largest _id:");
    console.log(largestID);
    db.close();
  });
});


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

app.get('/api/getrandomvid',function(req,res){
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

app.get('/api/getvid/:id',function(req,res){
  var __id = parseInt(req.params.id);
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos').findOne({_id: __id}, { "vidID": 1, _id:0 }, function(err, document) {
      db.close();
      res.json(document);
    });
  });
});

// get up to 50 videos at once
app.get('/api/getvidsfrom/:start/:end', function(req, res, next) {
  var start_id = parseInt(req.params.start);
  var end_id = parseInt(req.params.end);
  if(start_id < smallestID)
  {
    start_id = smallestID;
  }
  if(end_id < start_id)
  {
    end_id = start_id;
  }
  var len = end_id - start_id + 1;
  if(len > 50)
  {
    len = 50;
  }
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('videos').count(function(err, result){
      db.collection('videos').find({_id: {$gte: start_id }}, { "vidID": 1, _id:0 }).limit(len).toArray(  function(err, document) {
        db.close();
        res.json(document);
      });
    });
  });
});

app.get('/admin',function(req,res){
  res.render(path.join(__dirname+'/admin'));
});

app.listen(80);
