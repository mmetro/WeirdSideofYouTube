// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Account = require('../models/account');
var Video = require('../models/video');
var Counter = require('../models/counters');
var api = require('./api');
var reddit = require('./reddit');

//middleware for requiring admin permissions
exports.needsAdmin = function(req, res, next) {
  if (req.user && req.user.admin === true){
        return next();
      }
      else{
        //res.send(401, 'Unauthorized');
        res.redirect('/login');
      }
};

// render the admin panel index
exports.getIndex = function(req, res) {
    res.render('admin/index');
};

// handles the POST request for submitting a video
exports.postSubmitVid = function(req, res) {
  api.addVideo(req.body.videoID, function(err, vid){
    if(err)
          console.log(err);
      else
        res.redirect('/admin');
  });
};

// handles the POST request for removing a video
exports.postRemoveVid = function(req, res) {
  api.removeVideo(req.body.videoID);
  res.redirect('/admin');
};

// Special GET request for admins containging extra data
// handler for a GET request for a range of videos
// sends a JSON object containing the range of youtube video IDs
exports.getVidRangeAdmin = function(req, res) {
  var start_id = parseInt(req.params.start);
  var end_id = parseInt(req.params.end);
  Counter.findById('videos', function(error, counter)
  {
    var smallestID = 1;
    var largestID = counter.seq;
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
    Video.find({_id: {$gte: start_id }}, {'_id':1, 'videoID':1, 'views':1, 'errorCount':1, 'skips':1, 'time':1, 'submittedUser':1}).limit(len).lean().exec(function (err, docs) {
      res.json(docs);
    });
  });
};

// handles the POST request for removing a video
exports.postCrawlReddit = function(req, res) {
  reddit.crawlReddit();
  res.redirect('/admin');
};