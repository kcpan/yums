// Get all of our friend data
//var data = require('../data.json');
var less = require('../less.json');

exports.view = function(req, res){

	res.render('random', less);

	//res.render('index');
};
