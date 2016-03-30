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

Video.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'videos'}, {$inc: { seq: 1} }, {new: true, upsert: true, setDefaultsOnInsert: true}, function(error, counter)   {
        if(error)
            return next(error);
        console.log(counter.seq);
        doc._id = counter.seq;
        next();
    });
});

Video.post('remove', function(removed){
	console.log('removed', removed._id);
    //var doc = this;
    //counter.findByIdAndUpdate({_id: 'entityId'}, {$dec: { seq: 1} }, function(error, counter)   {
    //    if(error)
    //        return next(error);
    //    doc.testvalue = counter.seq;
    //    next();
    //});
});

module.exports = mongoose.model('Video', Video);
