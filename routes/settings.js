// Get all of our friend data
var data = require('../data.json');
var categories = require('../categories.json');

exports.view = function(req, res){
	console.log(data);
	res.render('settings', data, categories);
	//res.render('index');
};
