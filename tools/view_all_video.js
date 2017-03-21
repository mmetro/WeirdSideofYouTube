#!/bin/env node

var mongoose = require('mongoose');
var api = require('../controllers/api.js');
var Counter = require('../models/counters.js');

var database = require('../config/db');
mongoose.connect(database.url);

Counter.findById('bannedvideos', function (err, count)
{
  console.info(count.seq +  ' banned videos exist');
});

Counter.findById('videos', function (err, count)
{
  console.info(count.seq +  ' known videos exist');
});
