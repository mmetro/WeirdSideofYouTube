var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counter = require('./counters');

var Video = new Schema({
  _id: Number,
  videoID: String,
  views: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
  skips: { type: Number, default: 0 },
  time: {type: Date, default: Date.now},
  submittedUser: {type: String, default: '' }
});

module.exports = mongoose.model('Video', Video);
