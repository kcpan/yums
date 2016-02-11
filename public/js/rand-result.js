window.onload = searchYelp;

$(document).ready(function() {
});

function searchYelp(){
  $.get("/yelpsearch/3?city=La%20Jolla", addData);
}

function addData(result){
  console.log(result);
  var businesses = result['businesses'];
  var chosen = businesses[Math.floor(businesses.length * Math.random())];
  var categories = chosen.categories;

  var name = chosen.name;
  var phone = chosen.display_phone;
  var imgurl = chosen.image_url;
  var rating = chosen.rating_img_url_large;
  var count = chosen.review_count;
  var summary = chosen.snippet_text;

  var addedHTML = '<div class="name">' + name + '</div>' +
                  '<div class="phone">' + phone + '</div>' +
                  '<img class="image" src="' + imgurl + '">' +
                  '<img class="rating" src="' + rating + '">' +
                  '<div class="count">' + count + '</div>' +
                  '<div class="summary">' + summary + '</div>';
  $('.data').append(addedHTML);
}
