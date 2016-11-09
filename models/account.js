// sample model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  email: String,
  time: {type: Date, default: Date.now},
  admin: { type: Boolean, default: false }
});

Account.plugin(passportLocalMongoose, {usernameLowerCase: true});

module.exports = mongoose.model('Account', Account);
