#!/bin/env node

var mongoose = require('mongoose');
var Counter = require('../models/counters.js');

var database = require('../config/db');

var Video = require('../models/video.js');
var BannedVideo = require('../models/bannedvideo.js');

mongoose.connect(database.url);


Video.find({}, function(err, docs)
{
  docs.forEach(function(doc)
  {
    console.info('VidID: ' + doc.videoID);
  });
  BannedVideo.find({}, function(err, docs)
  {
    docs.forEach(function(doc)
    {
      console.info('Banned VidID: ' + doc.videoID);
    });
    Counter.findById('bannedvideos', function (err, count)
    {
      console.info(count.seq +  ' banned videos exist');
    });

    Counter.findById('videos', function (err, count)
    {
      console.info(count.seq +  ' known videos exist');
    });
  });
});
