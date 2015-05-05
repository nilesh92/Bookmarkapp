var express = require('express');
var router = express.Router();
var inspec = require('node-metainspector');
var abc = require('check-types');
var S = require('string');
var isAuthenticated = function (req, res, next) {

if (req.isAuthenticated())
return next();

res.redirect('/loginpage');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = function(passport){

router.get('/homepage', function(req, res) {
res.render('homepage', {title: 'Welcome page-'});
});

router.get('/loginpage', function(req, res) {
res.render('loginpage', {title: 'Login page -'});
});

router.get('/signuppage', function(req, res) {
res.render('signuppage', {title: 'Signup page -'});
});

router.get('/profilepage', isAuthenticated, function(req, res) {
res.render('profilepage', {user: req.user});
});

router.get('/mybookmarkspage', isAuthenticated, function(req, res) {

var Bmark = require('../models/bookmarks');
var user1 = req.user.username;

Bmark.find({'username': user1}, function (err, docs) {

if(err)
throw err;

console.log(docs);
res.render('mybookmarkspage', {user: req.user, docs : docs});
});
});


router.get('/addbookmarkspage', isAuthenticated, function(req, res) {

res.render('addbookmarkspage', {user: req.user});
});


router.post('/login', passport.authenticate('login', {
successRedirect: '/profilepage',
failureRedirect: '/loginpage'
}));

router.post('/signup', passport.authenticate('signup', {
successRedirect: '/loginpage',
failureRedirect: '/signuppage'
}));

router.get('/signout', function(req, res) {
req.logout();
res.redirect('/homepage');
});


router.post('/addlink', function(req, res) {

var Bmark = require('../models/bookmarks');
var link1 = req.body.link;
console.log(link1);
var tags1 = req.body.tags;
var arr = tags1.split(",");

console.log(tags1);
var user1 = req.user.username;
console.log(user1);
var bname1;

var client = new inspec(link1, {});
 
client.on("fetch", function(err){
if(err)
throw err;

bname1 = client.title;   

if(S(bname1).isEmpty())
bname1=link1;

console.log(bname1);

var newBmark = new Bmark();

newBmark.username=user1;
newBmark.bname=bname1;
newBmark.burl=link1;
newBmark.btag=arr;

newBmark.save(function(err) {
if (err){
throw err;
}

// return done(null, newBmark);
}); 

});
 
client.on("error", function(err){
    console.log(err);
});
 
client.fetch();



//res.location('/addbookmarkspage');
//res.redirect('mybookmarkspage');

});

return router;
}