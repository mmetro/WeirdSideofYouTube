#!/bin/env node
var readline = require('readline');
var mongoose = require('mongoose');
var vids = require('../models/video');
var count = require('../models/counter');

var database = require('../config/db');
mongoose.connect(database.url);

var total = db.count.find(seq);
var vidviews = db.vids.aggregate($sum: views);
var viderrors = db.vids.aggregate($sum: errorCount);
var vidskips = db.vids.aggregate($sum: skips);

console.log("Total Vids", total;);
console.log("Total Vid views", vidviews);
console.log("Total Vid errors", viderrors);
console.log("Total skips", vidskips);


