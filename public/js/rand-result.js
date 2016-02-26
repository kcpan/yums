window.onload = searchYelp;

$(document).ready(function() {
  $('.reroll').click(function(){
    $.get("/yelpsearch/3?term=food&city=La%20Jolla", reRoll);
  });
});

function searchYelp(){
  $.get("/yelpsearch/3?term=food&city=La%20Jolla", addData);
}

function addData(result){
  $('.data').removeClass('sk-spinner sk-spinner-pulse');

  var chosen = JSON.parse(localStorage.getItem("random-result"));

  if(jQuery.isEmptyObject(chosen)) {
    chosen = filter(result);
  }

  localStorage.setItem("random-result",JSON.stringify(chosen));
  console.log(chosen);

  var name = chosen.name;
  var phone = chosen.display_phone;
  var imgurl = chosen.image_url;
  var rating = chosen.rating_img_url_large;
  var count = chosen.review_count;
  var url = chosen.mobile_url;

  var street = chosen.location.address;
  var city = chosen.location.city;
  var state = chosen.location.state_code;
  var zip = chosen.location.postal_code;
  var address = street + "<br>" + city + " ," + state + " " + zip;

  var addedHTML = '<div class="name">' + name + '</div>' +
                  '<div class="phone">' + phone + '</div>' +
                  '<img class="image" src="' + imgurl + '">' +
                  '<img class="rating" src="' + rating + '">' +
                  '<div class="count">' + count + '</div>' +
                  '<div class="address">' + address + '</div>';
  $('.data').append(addedHTML);
  $('.yelp').attr("href", url);
}

function reRoll(result){
  var chosen = filter(result);
  localStorage.setItem("random-result",JSON.stringify(chosen));

  var name = chosen.name;
  var phone = chosen.display_phone;
  var imgurl = chosen.image_url;
  var rating = chosen.rating_img_url_large;
  var count = chosen.review_count;
  var url = chosen.mobile_url;

  var street = chosen.location.address;
  var city = chosen.location.city;
  var state = chosen.location.state_code;
  var zip = chosen.location.postal_code;
  var address = street + "<br>" + city + " ," + state + " " + zip;

  var addedHTML = '<div class="data">' +
                  '<div class="name">' + name + '</div>' +
                  '<div class="phone">' + phone + '</div>' +
                  '<img class="image" src="' + imgurl + '">' +
                  '<img class="rating" src="' + rating + '">' +
                  '<div class="count">' + count + '</div>' +
                  '<div class="address">' + address + '</div>' +
                  '</div>';
  $('.data').replaceWith(addedHTML);
  $('.yelp').attr("href", url);
}

function filter(result){
  var chosen;
  var restr = JSON.parse(localStorage.getItem("resJson"));
  console.log(restr);

  console.log(result);
  var businesses = result['businesses'];

  var done = false;
  while(!done) {
    chosen = businesses[Math.floor(businesses.length * Math.random())];

    done = true;
    var categories = chosen.categories;
    var tags = "";

    for(var i=0; i<categories.length; i++) {
      var inner = categories[i];

      for(var j=0; j<inner.length; j++) {
        tags = tags.concat(inner[j] + " ");
      }
    }

    for(var i=0; i<restr.length; i++) {
      if(tags.search(restr[i]) != -1) {
        console.log("conflict!");
        done = false;
      }
    }
  }

  return chosen;
}
