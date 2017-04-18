// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose');
var Counter = require('../models/counters.js');
var request = require('request');

var database = require('../config/db');

var Video = require('../models/video.js');
var BannedVideo = require('../models/bannedvideo.js');
var api = require('../controllers/api.js');

mongoose.connect(database.url);

//Removes any videos that are either in the banned video list, or bans them if they're inaccessable.
exports.pruneVideoDatabase = function()
{
  Video.find({}, function(err, docs)
  {
    docs.forEach(function(doc)
    {
      // XXX TODO set this key in the 'config' directory
      var youtubeAPIKey = 'AIzaSyBf-B5_3Iz5a8Ij52BioFPOE4xJLqC9Sy8';
      request('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + doc.vidID + '&key=' + youtubeAPIKey, function (error, response, body)
      {
        if (!error && response.statusCode == 200)
        {
          var reqJSON = JSON.parse(body);
          for(var i = 0; i < reqJSON.data.children.length; i++)
          {
            console.log(reqJSON.data.children[i].data);
          }
        }
      });
    });
  });
};

exports.pruneVideoDatabase();

// Run this function Hourly
//schedule.scheduleJob('0 0 * * *', exports.pruneVideoDatabase);
