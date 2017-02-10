// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Video = require('../models/video');
var Counter = require('../models/counters');
var api = require('./api');
var request = require('request');
var schedule = require('node-schedule');

// handles the POST request for crawling reddit
// adds the top videos to the database
exports.crawlReddit = function() {
  // top 100 videos for the year
  request('https://www.reddit.com/r/deepintoyoutube/top/.json?limit=100&t=year', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var reqJSON = JSON.parse(body);
      for(var i = 0; i < reqJSON.data.children.length; i++)
      {
        var url = reqJSON.data.children[i].data.url;
        // http://stackoverflow.com/questions/10591547/how-to-get-youtube-video-id-from-url
        // modified to work with timestamps or a question mark
        // this line of code is licensed under cc by-sa 3.0
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/)[1];
        console.log("Adding video id: " + videoid + " to database");
        api.addVideo(videoid, function(err, vid){
          if(err)
            console.log(err);
        });
      }
    }
  })
};

// Run this function periodically (daily?)
var j = schedule.scheduleJob('0 0 * * *', exports.crawlReddit);