// Invoke 'strict' JavaScript mode
'use strict';

var passport = require('passport');
var Account = require('../models/account');
var api = require('./api');

exports.needsAdmin = function(req, res, next) {
  if (req.user && req.user.admin === true){
        return next();
      }
      else{
        //res.send(401, 'Unauthorized');
        res.redirect('/login');
      }
};

exports.getIndex = function(req, res) {
    res.render('admin/index');
};
exports.postSubmitVid = function(req, res) {
  api.addVideo(req.body.videoID, function(err, vid){
    if(err)
          console.log(err);
      else
        res.redirect('/admin');
  });
};

exports.postRemoveVid = function(req, res) {
  api.removeVideo(req.body.videoID);
  res.redirect('/admin');
};
