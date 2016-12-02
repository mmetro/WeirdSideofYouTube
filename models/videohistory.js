// sample model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideoHistory = new Schema({
  username: String,
  videoID: String,
  time: {type: Date, default: Date.now},
},
{
	capped: {size: 10000000}
});

VideoHistory.index({username: 1, time: 1});

module.exports = mongoose.model('VideoHistory', VideoHistory);
