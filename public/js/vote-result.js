window.onload = searchYelp;

$(document).ready(function() {
});

function searchYelp(){
  var pairs = JSON.parse(localStorage.getItem("voteJson"));
  var winners = [];
  for(var i = 0; i < pairs.length; i++) {
    if(pairs[i].check == true){
      winners.push(pairs[i].restaurant);
    }
  }

  var winner;
  if(winners.length > 0)
    winner = winners[Math.floor(winners.length * Math.random())];
  else {
    winner = "food";
  }

  $.get("/yelpsearch/3?term=" + winner + "&city=San%20Diego", addData);
}

function addData(result){
  $('.title').text('RESULTS');
  $('#loading').remove();

  console.log(result);
  var businesses = result.businesses;
  var chosenJson = [];

  for(var i = 0; i < 3; i++) {
    var chosen = businesses[i];
    chosenJson.push(chosen);

    var name = chosen.name;
    var phone = chosen.display_phone;
    var imgurl = chosen.image_url;
    imgurl = imgurl.replace('ms.jpg','348s.jpg');

    var rating = chosen.rating_img_url_large;
    var count = chosen.review_count;
    var url = chosen.mobile_url;

    var street = chosen.location.address;
    var city = chosen.location.city;
    var state = chosen.location.state_code;
    var zip = chosen.location.postal_code;
    var address = street + "<br>" + city + " ," + state + " " + zip;
    var addedHTML = '<div class="data">' +
                    '<div class ="row">'+
                      '<div class="name col-xs-12 ">'+ name +'</div>'+
                    '</div>' +
                    '<div class ="row">'+
                      '<div class="phone col-xs-6">' + phone +
                      '<img class="rating" src="' + rating + '">' +
                      '</div>' +
                      '<div class="address col-xs-6">' + address +
                      '<a href="' + url + '" target="_blank" class="btn btn-default yelp">Yelp Page</a>' +
                      '</div>' +
                    '</div>' +
                    '<div class ="row">'+
                    '<img class="image col-xs-12" src="' + imgurl + '">' +
                    '<div class ="row">'+
                    '</div>';
    $('#winnerHolder').append(addedHTML);
    //$('.yelp').attr("href", url);
  }

  localStorage.setItem("vote-result",JSON.stringify(chosen));
}
