// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	console.log(req.query);	
	if (req.query) {
		if(req.query['vote-McDonald\'s'] == 1){
		data.restaurants[0].vote = (Number(data.restaurants[0].vote) + 1);
	    }
    }
	console.log(data);
	res.render('vote-result', data);
	//res.render('index');
};
