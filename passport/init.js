var login = require('./login');
var signup = require('./signup');
var database = require('../db.js');

module.exports = function(passport){

	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        console.log('serializing user: ');console.log(user);
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        MongoClient.connect(database.url, function(err, db) {
            assert.equal(null, err);
            // TODO: Do I want to pass in the user object, or should I pass in user["username"]
            db.collection('users')findOne({'username': id}, function(err, user) {
                console.log('deserializing user:',user);
                done(err, user);
            });
        });
    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}