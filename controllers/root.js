var passport = require('passport');
var Account = require('../models/account');
var api = require('./api');

// Invoke 'strict' JavaScript mode
'use strict';

exports.getIndex = function(req, res) {
  api.randomVideoID(function(err, vidID)
  {
    res.render('index', { videoID : vidID, user: req.user });
  });
};

exports.getRegister = function(req, res) {
      res.render('register', { });
};

exports.postRegister = function(req, res) {
  // Use the 'response' object to render the 'index' view with a 'title' and a stringified 'user' properties
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account });
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/');
      });
  });
};

exports.getLogin = function(req, res) {
    res.render('login', { user : req.user });
};

exports.postLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

exports.getLogout = function(req, res) {
    req.logout();
    res.redirect('/');
};
