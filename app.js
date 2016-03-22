
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var database = require('./config/db');

var express = require("express");
var app     = express();
var path    = require("path");

// Configuring Passport
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var expressSession = require('express-session');
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/'));

MongoClient.connect(database.url, function(err, db) {
  // NOTE: if we add or remove videos, how will we handle this?
  // Should we keep track of it on our own, or should we make a call to MongoDB each time?
  // I'm thinking that we should make the MongoDB call each time a video is added/removed
  var smallestID = 0
  var largestID = 0

  assert.equal(null, err);
  db.collection('videos').find({}, { _id: 1 }).sort({_id: 1}).limit(1).next( function(err, document) {
    smallestID = document["_id"];
    console.log("Smallest _id:");
    console.log(smallestID);
  });

  assert.equal(null, err);
  db.collection('videos').find({}, { _id: 1 }).sort({_id: -1}).limit(1).next( function(err, document) {
    largestID = document["_id"];
    console.log("Largest _id:");
    console.log(largestID);
  });


  app.get('/',function(req,res){
    var randomID;
      assert.equal(null, err);
      db.collection('videos').count(function(err, result){
        db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, { "vidID": 1, _id:0 }, function(err, document) {
          res.render('index', { videoID: document["vidID"]});
        });
      });
  });

  app.get('/login',
    function(req, res){
      res.render('login');
  });

  app.post('/login', 
        passport.authenticate('local', { failureRedirect: '/login' }),
        function(req, res) {
          res.redirect('/');
  });

  app.get('/api/getrandomvid',function(req,res){
    var randomID;
      assert.equal(null, err);
      db.collection('videos').count(function(err, result){
        db.collection('videos').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, { "vidID": 1, _id:0 }, function(err, document) {
          res.json(document);
        });
      });
  });

  app.get('/api/getvid/:id',function(req,res){
    var __id = parseInt(req.params.id);
      assert.equal(null, err);
      db.collection('videos').findOne({_id: __id}, { "vidID": 1, _id:0 }, function(err, document) {
        res.json(document);
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
      assert.equal(null, err);
      db.collection('videos').count(function(err, result){
        db.collection('videos').find({_id: {$gte: start_id }}, { "vidID": 1, _id:0 }).limit(len).toArray(  function(err, document) {
          res.json(document);
        });
      });
  });

  app.get('/admin',function(req,res){
    res.render('admin');
  });

  app.listen(80);

});