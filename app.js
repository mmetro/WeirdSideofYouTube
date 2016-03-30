// dependencies
var fs = require('fs');
var http = require('http');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// express middleware
//var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var errorHandler = require('errorhandler');

// global config
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');
app.set('view engine', 'ejs');  
app.set('view options', { layout: false });
app.use(logger('dev'));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(cookieParser('CHANGEMESECRET'));
app.use(session({ resave: true,
                  saveUninitialized: true,
                  secret: 'sessionsecret' }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// env config
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}
else {
    app.use(express.errorHandler());
}

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
var database = require('./config/db');
mongoose.connect(database.url);

// routes
var router = require('./router')(app);

app.listen(app.get('port'), function(){
  console.log(("Express server listening on port " + app.get('port')))
});
