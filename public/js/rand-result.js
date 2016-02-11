window.onload = searchYelp;

$(document).ready(function() {
});

function searchYelp(){
  $.get("/yelpsearch/3?city=La%20Jolla", addData);
}

function addData(result){
  console.log(result);
  var businesses = result['businesses'];
  var categories = businesses[0].categories;
  var chosen = businesses[Math.floor(businesses.length * Math.random())];

  var name = chosen.name;
  var phone = chosen.display_phone;
  var imgurl = chosen.image_url;
  var rating = chosen.rating_img_url_large;
  var summary = chosen.snippet_text;

  var addedHTML = '<div class="name">' + name + '</div>' +
                  '<div class="phone">' + phone + '</div>' +
                  '<img src="' + imgurl + '">' +
                  '<img src="' + rating + '">' +
                  '<div class="summary">' + summary + '</div>';
  $('.data').append(addedHTML);
}
