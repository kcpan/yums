// Get all of our friend data
var data = require('../data.json');

exports.view = function(req, res){
	/*var random_num = Math.random();
	console.log(random_num);

	if (random_num > 0.5) {
	  data["three"] = false;
	  res.render('rand-result', data);
	} else {
	  res.redirect('/rand-result3');
	}*/

	data["three"] = false;
	console.log(data);
	res.render('rand-result', data);
	//res.render('index');
};

exports.viewThree = function(req, res){
	data["three"] = true;
	console.log(data);
	res.render('rand-result', data);
}
