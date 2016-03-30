// Invoke 'strict' JavaScript mode
'use strict';

var mongoose = require('mongoose');
var Video = require('../models/video');
var Counter = require('../models/counters');
var Chance = require('chance');
var chance = new Chance();

exports.addVideo = function(vid, callback)
{
    Counter.findByIdAndUpdate('videos', {$inc: { seq: 1} }, {new: true, upsert: true, setDefaultsOnInsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        Video.create({ 'videoID' : vid, '_id': counter.seq }, function(err, vid){
			if(err)
	        	console.log(err);
	        callback(err,vid);
		});
    });
}

exports.removeVideo = function(vidID)
{
	console.log('[' + vidID + ']');
	Video.findOne({'videoID': vidID}, function (error, video){
		console.log(video);
		var __id = video._id;
		console.log(__id);
		Counter.findById('videos', function(error, counter)
		{
			console.log(counter);
			console.log(counter.seq);
			Video.findOne({'_id': counter.seq}, function (error, _video){
				video.remove();
				Video.create({ 'videoID' : _video.videoID, '_id': __id}, function(err, vid){
					_video.remove();
					counter._id = counter._id - 1;
					counter.save();
				});
			});	
		});
	});
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
		res.json({'vidID' : vidID});
	});
};

exports.getSubmitVid = function(req, res) {
	res.render('submit', { });
};

exports.postSubmitVid = function(req, res) {
	exports.addVideo(req.body.videoID, function(err, vid){
		if(err)
        	console.log(err);
    	else
    		res.send('Video with ID ' + req.body.videoID + ' submitted: ' + vid);
	});
};

exports.getRemoveVid = function(req, res) {
	res.render('remove', { });
};

exports.postRemoveVid = function(req, res) {
	exports.removeVideo(req.body.videoID);
};
