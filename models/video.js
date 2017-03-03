var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counter = require('./counters');
var videocache = require('./videocache');

var Video = new Schema({
  _id: Number,
  videoID: String,
  views: { type: Number, default: 0 },
  errorCount: { type: Number, default: 0 },
  skips: { type: Number, default: 0 },
  time: {type: Date, default: Date.now},
  submittedUser: {type: String, default: '' },
  cache: [{type: Schema.Types.ObjectId, ref: 'VideoCache'}]
});

// Improve performance and ensure no duplicates
Video.index({_id: 1}, {unique: true});
Video.index({videoID: 1}, {unique: true});

module.exports = mongoose.model('Video', Video);
