// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose');
var Video = require('../models/video');
var Counter = require('../models/counters');
var Chance = require('chance');
var chance = new Chance();

exports.addVideo = function(vid, callback)
{

}

exports.removeVideo = function(vid, callback)
{
	
}

exports.randomVideoID = function(callback)
{
	Counter.findById('videos', function (err, count) {
		var rand = chance.integer({min: 1, max: (count.seq-1)});;
		Video.findById(rand, function (err, myDocument) {
			callback(err, myDocument.videoID);
		});
	}); 
};

exports.getRandomVid = function(req, res) {
	exports.randomVideoID(function(err, vidID)
	{
		res.json({vidID : vidID});
	});
};

exports.getSubmitVid = function(req, res) {
	res.render('submit', { });
};

exports.postSubmitVid = function(req, res) {
	Video.findById(rand, function (err, myDocument) {
		Video.create({ videoID : req.body.videoID }, function(err, vid){
			if(err)
	        	console.log(err);
	    	else
	    		res.send('Video with ID ' + req.body.videoID + ' submitted: ' + vid);
		});
	});
};
