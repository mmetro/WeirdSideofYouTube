var passport = require('passport');
var Account = require('../models/account');
var api = require('./api');

// Invoke 'strict' JavaScript mode
'use strict';

// handler for a GET request for the index
exports.getIndex = function(req, res) {
  api.randomVideoID(req.user, function(err, vidID)
  {
    res.render('index', { videoID : vidID, user: req.user });
  });
};

// handler for a GET request for the registration page
exports.getRegister = function(req, res) {
      res.render('register', { });
};

// handler for the POST request for registering a user
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

// handler for a GET request for the login page
exports.getLogin = function(req, res) {
    res.render('login', { user : req.user });
};

// handler for the POST request for logging in a user
exports.postLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// handler for the GET request for logging out a user
exports.getLogout = function(req, res) {
    req.logout();
    res.redirect('/');
};

// handler for the GET request for the about page
exports.getAbout = function(req, res) {
    res.render('about', { user : req.user });
};

// handler for the GET request for the history page
exports.getHistory = function(req, res) {
  if(req.user)
  {
    res.render('history', { user : req.user });
  }
  else
  {
    res.redirect('/');
  }
};

