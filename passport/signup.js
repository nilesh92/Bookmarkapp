var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

passport.use('signup', new LocalStrategy({
passReqToCallback : true
},
function(req, username, password, done) {

findOrCreateUser = function(){

User.findOne({ 'username' : username }, function(err, user) {

if(err){
return done(err);
}

if (user) {
return done(null, false);
}
else
{
var newUser = new User();

newUser.username = username;
newUser.password = createHash(password);

newUser.save(function(err) {
if (err){
throw err;
}
return done(null, newUser);
});
}
});
};

process.nextTick(findOrCreateUser);
})
);

var createHash = function(password){
return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
}