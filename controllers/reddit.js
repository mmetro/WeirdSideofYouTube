// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Video = require('../models/video');
var Counter = require('../models/counters');
var api = require('./api');
var request = require('request');

// handles the POST request for submitting a video
exports.crawlReddit = function() {

  // get top video from /r/deepintoyoutube
  request('https://www.reddit.com/r/deepintoyoutube/top/.json?count=1', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var reqJSON = JSON.parse(body);
      for(var i = 0; i < reqJSON.data.children.length; i++)
      {
        var url = reqJSON.data.children[i].data.url;
        // http://stackoverflow.com/questions/10591547/how-to-get-youtube-video-id-from-url
        // XXX This fails when a linked video includes a timestamp, ie _9UyQ5hw8jo?t=28s
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/)[1];
        console.log(url);
        console.log(videoid);
      }
    }
  })
  // TODO need to check if the video already exists before adding it

  //api.addVideo(req.body.videoID, function(err, vid){
  //  if(err)
  //        console.log(err);
  //});
};
//data.children
//data.url