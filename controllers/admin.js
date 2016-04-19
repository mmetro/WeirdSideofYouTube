// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Account = require('../models/account');
var api = require('./api');

//middleware for requiring admin permissions
exports.needsAdmin = function(req, res, next) {
  if (req.user && req.user.admin === true){
        return next();
      }
      else{
        //res.send(401, 'Unauthorized');
        res.redirect('/login');
      }
};

// render the admin panel index
exports.getIndex = function(req, res) {
    res.render('admin/index');
};

// handles the POST request for submitting a video
exports.postSubmitVid = function(req, res) {
  api.addVideo(req.body.videoID, function(err, vid){
    if(err)
          console.log(err);
      else
        res.redirect('/admin');
  });
};

// handles the POST request for removing a video
exports.postRemoveVid = function(req, res) {
  api.removeVideo(req.body.videoID);
  res.redirect('/admin');
};
