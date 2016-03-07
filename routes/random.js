// Get all of our friend data
//var data = require('../data.json');
var categories = require('../categories.json');

exports.view = function(req, res){

	cat = JSON.stringify(categories);
	final = {"place":[]};
	for(i = 0; i < categories.length; i++)
	{
		// console.log(categories[i].parents);
		if(categories[i].parents=='restaurants' || categories[i].parents=='food')
		{
			final.place.push({'title':categories[i].title, 'alias':categories[i].alias});
		}
	}
	console.log(final);

	res.render('random', final);

	//res.render('index');
};
