// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose');
var Video = require('../models/video');
var Counter = require('../models/counters');
var VideoHistory = require('../models/videohistory');
var Chance = require('chance');
var chance = new Chance();
var request = require('request');
var BannedVideo = require('../models/bannedvideo');

// internal function for adding a video to the database
// vid is a string representing the youtube video ID
exports.addVideo = function (video_url_or_id, callback)
{    //Don't re-add a banned video
  var video_split = video_url_or_id.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/);
  var vidID = video_url_or_id;
  if(video_url_or_id != null && video_split != null)
  {
    vidID = video_split[1];
  }
  BannedVideo.findOne({ 'videoID': vidID }, function (error, vid)
  {
    if (!vid)
    {
      // Don't add duplicates to the database
      Video.findOne({ 'videoID': vidID }, function (error, vid)
      {
        if (!vid)
        {
          Counter.findByIdAndUpdate('videos', { $inc: { seq: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true }, function (error, counter)
          {
            if (error)
              return next(error);
            Video.create({ 'videoID': vidID, '_id': counter.seq }, function (err, vid)
            {
              if (err)
                console.log(err);
              callback(err, vid);
            });
          });
        }
        else
        {
          callback(null, vidID);
        }
      });
    }
    else
    {
      callback(null, vidID);
    }
  });
};

// internal function for removing a video by youtube ID
exports.removeVideo = function (video_url_or_id)
{
  var video_split = video_url_or_id.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/);
  var vidID = video_url_or_id;
  if(video_url_or_id != null && video_split != null)
  {
    vidID = video_split[1];
  }
  if (vidID)
  {


    // Don't add duplicates to the database
    BannedVideo.findOne({ 'videoID': vidID }, function (error, vid)
    {
      if (!vid)
      {
        Counter.findByIdAndUpdate('bannedvideos', { $inc: { seq: 1 } }, { new: true, upsert: true, setDefaultsOnInsert: true }, function (error, counter)
        {
          if (error)
            return next(error);
          BannedVideo.create({ 'videoID': vidID, '_id': counter.seq }, function (err, vid)
          {
            if (err)
              console.log(err);
          });
        });
      }
    });

    Video.findOne({ 'videoID': vidID }, function (error, video)
    {
      var __id = video._id;
      Counter.findById('videos', function (error, counter)
      {
        Video.findOne({ '_id': counter.seq }, function (error, _video)
        {
          video.remove();
          Video.create({ 'videoID': _video.videoID, '_id': __id }, function (err, vid)
          {
            _video.remove();
            counter.seq = counter.seq - 1;
            counter.save();
          });
        });
      });
    });
  }
};

// internal function for getting a random youtube ID.
// tries to avoid repeating videos in the recent user history by reselecting up to 5 times
// the callback function expects an error as the first argument, and the video ID as the second
exports.randomVideoID = function (user, callback)
{
  Counter.findById('videos', function (err, count)
  {
    var rand = chance.integer({ min: 1, max: (count.seq - 1) });
    if(user)
    {
      var currentVideoHistory = VideoHistory.find({ username: user.username }, { '_id': 0, 'videoID': 1, 'x': 1 }).sort({ time: -1 }).limit(Math.min(50, count.seq / 2));
      var loopExitCounter = 0;
      while (loopExitCounter < 5)
      {
        rand = chance.integer({ min: 1, max: (count.seq - 1) });

        //Get the index's video ID and check that against the history.
        var vid_id;
        Video.findById(rand, function (err, myDocument)
        {
          vid_id = myDocument.videoID;
        });
        if (currentVideoHistory.findOne(vid_id) != -1)
        {
          break;
        }
        loopExitCounter++;  //Worst case is 5, then just pick a truly random video.
      }
    }

    Video.findByIdAndUpdate(rand, { $inc: { views: 1 } }, function (err, myDocument)
    {
      if (user)
      {
        VideoHistory.create({ 'username': user.username, 'videoID': myDocument.videoID }, function (err, vid)
        {
          if (err)
            console.log(err);
        });
      }
      if (err)
        callback(err, null);
      else
        callback(err, myDocument.videoID);
    });
  });
};

// Handler for a GET request for a random video.
// sends the client a JSON object with the youtube video ID
exports.getRandomVid = function (req, res)
{
  exports.randomVideoID(req.user, function (err, vidID)
  {
    res.json({ 'vidID': vidID });
  });
};

// handler for a GET request for a range of videos
// sends a JSON object containing the range of youtube video IDs
exports.getVidRange = function (req, res)
{
  var start_id = parseInt(req.params.start);
  var end_id = parseInt(req.params.end);
  Counter.findById('videos', function (error, counter)
  {
    var smallestID = 1;
    var largestID = counter.seq;

    if (start_id < smallestID)
    {
      start_id = smallestID;
    }
    if (end_id < start_id)
    {
      end_id = start_id;
    }
    var len = end_id - start_id + 1;
    if (len > 50)
    {
      len = 50;
    }

    Video.find({ _id: { $gte: start_id } }, { 'videoID': 1 }).limit(len).lean().exec(function (err, docs)
    {
      res.json(docs);
    });
  });
};


// handler for a GET request for a user's video history
// sends a JSON object containing the last 50 videos watched
exports.getVideoHistory = function (req, res)
{
  if (req.user)
  {
    VideoHistory.find({ username: req.user.username }, { '_id': 0, 'videoID': 1, 'time': 1 }).sort({ time: -1 }).limit(50).exec(function (error, history)
    {
      res.json(history);
    });
  }
  else
  {
    res.status(401).send('User is not logged in');
  }
};

// handler for a GET request for the number of videos in the database
exports.getNumVids = function (req, res)
{
  Counter.findById('videos', function (err, count)
  {
    res.json({ 'numVids': count.seq });
  });
};

// handler for a GET request for the number of videos in the database
exports.getNumBannedVids = function (req, res)
{
  Counter.findById('bannedvideos', function (err, count)
  {
    res.json({ 'numBannedVids': count.seq });
  });
};


// handler for a request for video information
// Will return the same data that the youtube API would return about a video
exports.getVideoInfo = function (req, res)
{
  // XXX TODO set this key in the 'config' directory
  var youtubeAPIKey = "AIzaSyBf-B5_3Iz5a8Ij52BioFPOE4xJLqC9Sy8";
  request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + req.params.videoID + '&key=' + youtubeAPIKey, function (error, response, body)
  {
    if (!error && response.statusCode == 200)
    {
      res.send(body);
    }
  });
};
