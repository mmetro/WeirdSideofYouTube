// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Video = require('../models/video');
var Counter = require('../models/counters');
var api = require('./api');
var request = require('request');

// handles the POST request for crawling reddit
// adds the top video to the database
exports.crawlReddit = function() {
  // top 10 videos for the week
  request('https://www.reddit.com/r/deepintoyoutube/top/.json?limit=10&t=week', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var reqJSON = JSON.parse(body);
      for(var i = 0; i < reqJSON.data.children.length; i++)
      {
        var url = reqJSON.data.children[i].data.url;
        // http://stackoverflow.com/questions/10591547/how-to-get-youtube-video-id-from-url
        // modified to work with timestamps or a question mark
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/)[1];
        api.ifNotVideoExists(videoid, function(vidID)
        {
          console.log("Adding video id: " + vidID + " to database");
          api.addVideo(vidID, function(err, vid){
            if(err)
                  console.log(err);
            else
              console.log("Added video id: " + vid + " to database");
          });
        });
      }
    }
  })
};
