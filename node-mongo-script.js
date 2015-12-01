var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/test';



MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
 db.collection('videos', function(err, coll) {
     coll.count(function(err, result){
      db.collection('youtubes').findOne({_id: Math.floor(Math.random() * (result-1)) + 1}, function(err, document) {
        console.log(document);
        db.close();
      });
    });
  });
});
