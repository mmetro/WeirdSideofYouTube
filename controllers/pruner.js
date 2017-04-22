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
  var pruneCount = 0;
  console.info('Beginning pruner, please be patient...');
  Video.find({}, function(err, docs)
  {
    var doc_count = 0;
    docs.forEach(function(doc)
    {
      doc_count++;
      // XXX TODO set this key in the 'config' directory
      var youtubeAPIKey = 'AIzaSyBf-B5_3Iz5a8Ij52BioFPOE4xJLqC9Sy8';
      var videoID = doc.videoID;
      var requestID = ('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoID + '&key=' + youtubeAPIKey);
      //Short delay so we don't overuse the API
      setTimeout(request, 100 * doc_count, requestID, videoID, function (error, response, body)
      {
        if (!error && response.statusCode == 200)
        {
          var reqJSON = JSON.parse(body);
          console.log('Checking ' + videoID + ' ' + requestID + ':');
          //console.log(JSON.stringify(reqJSON));
          if(reqJSON.pageInfo.totalResults == 0)
          {
            //Video is not viewable, remove from database
            api.removeVideoNoParse(videoID, function(err, _vid) {
              if(err != null) {
                console.error('There was a problem pruning the video');
              } else {
                pruneCount++;
                console.info(requestID + ' pruned successfully! ' + pruneCount + ' videos removed so far.');
              }
            });
          }
        }
      });
    });
  });
};

exports.pruneVideoDatabase();

// Run this function Hourly
//schedule.scheduleJob('0 0 * * *', exports.pruneVideoDatabase);
