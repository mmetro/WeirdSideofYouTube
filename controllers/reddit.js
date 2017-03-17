// Invoke 'strict' JavaScript mode
'use strict';

var api = require('./api');
var request = require('request');
var schedule = require('node-schedule');

exports.crawlRedditUrl = function(reddit_url)
{
  request(reddit_url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var reqJSON = JSON.parse(body);
      for(var i = 0; i < reqJSON.data.children.length; i++)
      {
        var url = reqJSON.data.children[i].data.url;
        // http://stackoverflow.com/questions/10591547/how-to-get-youtube-video-id-from-url
        // modified to work with timestamps or a question mark
        // this line of code is licensed under cc by-sa 3.0
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&\?]+)/);
        if(videoid != null)
        {
          console.log('Adding video id: ' + videoid + ' to database');
          api.addVideo(videoid[1], function(err, _vid){
            if(err)
              console.log(err);
          });
        }
      }
    }
  });
};

// handles the POST request for crawling reddit
// adds the top videos to the database
exports.crawlReddit = function() {
  exports.crawlRedditUrl('https://www.reddit.com/r/deepintoyoutube/top/.json?limit=250&t=all'); //Get all time top videos
  setTimeout(function() {
    console.log('Finished crawling r/deepintoyoutube all time');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/deepintoyoutube/top/.json?limit=25&t=week'); //Get newer videos
  setTimeout(function() {
    console.log('Finished crawling r/deepintoyoutube weekly');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/NotTimAndEric/top/.json?limit=50&t=all');  //Get all time top videos, only a few since it's a niche area
  setTimeout(function() {
    console.log('Finished crawling r/NotTimAndEric all time');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/NotTimAndEric/top/.json?limit=10&t=month'); //Get new-ish videos
  setTimeout(function() {
    console.log('Finished crawling r/NotTimAndEric monthly');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/fifthworldvideos/top/.json?limit=50&t=all'); //A bit more obscure stuff but it fits well
  setTimeout(function() {
    console.log('Finished crawling r/fifthworldvideos all time');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/InterdimensionalCable/top/.json?limit=50&t=all');
  setTimeout(function() {
    console.log('Finished crawling r/InterdimensionalCable all time');
  }, 3000); //Short pause so we don't break reddit
  exports.crawlRedditUrl('https://www.reddit.com/r/InterdimensionalCable/top/.json?limit=10&t=month');
  console.log('Finished crawling r/InterdimensionalCable monthly');
};

// Run this function Hourly
schedule.scheduleJob('0 0 * * *', exports.crawlReddit);
