// Request API access: http://www.yelp.com/developers/getting_started/api_access
var Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: 'zye9FbDX5aR2e59Sid5XQw',
  consumer_secret: 'mcOL_vCY8ZS5e1RMggfEdjTGCDM',
  token: 'J92yRS5TS9n2Hyo78mqjBJYqAQoU5z2s',
  token_secret: 'opx1chezhoCTpUvmK7aNuV3Krwk',
});

exports.search = function(req, res){
  console.log(req.params.id);
  console.log(req.query.city);
  yelp.search({ term: 'food', location: 'La Jolla' })
  .then(function (data) {
    res.json(data);
  })
  .catch(function (err) {
    console.error(err);
  });
}
