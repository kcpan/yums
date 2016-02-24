window.onload = searchYelp;

$(document).ready(function() {
});

function searchYelp(){
  var votes = JSON.parse(localStorage.getItem("voteJson"));
  var winner = votes[Math.floor(votes.length * Math.random())];
  console.log(winner);
  $.get("/yelpsearch/3?term=" + winner + "&city=San%20Diego", addData);
}

function addData(result){
  $('.data').removeClass('sk-spinner sk-spinner-pulse');
  
  console.log(result);
  var businesses = result['businesses'];
  var chosen = businesses[Math.floor(businesses.length * Math.random())];

  localStorage.setItem("vote-result",JSON.stringify(chosen));

  var name = chosen.name;
  var phone = chosen.display_phone;
  var imgurl = chosen.image_url;
  var rating = chosen.rating_img_url_large;
  var count = chosen.review_count;
  var summary = chosen.snippet_text;
  var url = chosen.mobile_url;

  var addedHTML = '<div class="name">' + name + '</div>' +
                  '<div class="phone">' + phone + '</div>' +
                  '<img class="image" src="' + imgurl + '">' +
                  '<img class="rating" src="' + rating + '">' +
                  '<div class="count">' + count + '</div>' +
                  '<div class="summary">' + summary + '</div>';
  $('.data').append(addedHTML);
  $('.yelp').attr("href", url);
}
