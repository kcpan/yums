
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var mongoose = require('mongoose');

require('es6-promise').polyfill();

var index = require('./routes/index');
var home = require('./routes/home');
var random = require('./routes/random');
var randresult = require('./routes/rand-result');
var yelpsearch = require('./routes/yelpsearch');
var vote = require('./routes/vote');
var voteresult = require('./routes/vote-result');
var profile = require('./routes/profile');
var settings = require('./routes/settings');
var database = require('./routes/database');
// Example route
// var user = require('./routes/user');

// Connect to the Mongo database, whether locally or on Heroku
// MAKE SURE TO CHANGE THE NAME FROM 'lab7' TO ... IN OTHER PROJECTS
var local_database_name = 'yums';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect(database_uri);

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/home', home.view);
app.get('/random', random.view);
app.get('/rand-result', randresult.view);
app.get('/rand-result3', randresult.viewThree);
app.get('/yelpsearch/:id', yelpsearch.search);
app.get('/vote', vote.view);
app.get('/vote-result', voteresult.view);
app.get('/profile', profile.view);
app.get('/settings', settings.view);

app.get('/database/:id', database.getRooms);
app.get('/database/join/:id', database.joinRoom);
app.get('/database/check/:id', database.checkRoom);
app.post('/database/create', database.createRoom);
app.post('/database/updateRestrictions', database.updateRoomRestriction);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
