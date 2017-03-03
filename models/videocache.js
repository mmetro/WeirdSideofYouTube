
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoCache = new Schema({
  _id: String,
  cache: [],
  time: {type: Date, default: Date.now},
});

module.exports = mongoose.model('VideoCache', VideoCache);
