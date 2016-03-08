var loopAmount = 1;

window.onload = searchYelp;

$(document).ready(function() {
  initializePage();

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

  if ($('#winnerHolder').length){
    loopAmount = 3;
  }

  var chosenJson = [];
  for(var i = 0; i < loopAmount; i++) {
    chosen = filter(result);

    while($.inArray(chosen, chosenJson) != -1) {
      chosen = filter(result);
    }
    chosenJson.push(chosen);

    parseData(chosen);
  }
  localStorage.setItem("random-result",JSON.stringify(chosen));
}

function reRoll(result){
  $('#winnerHolder').replaceWith('<div id="winnerHolder" class="row"></div>');
  $('.data').replaceWith('<div class="data"></div>');

  var chosenJson = [];
  for(var i = 0; i < loopAmount; i++) {
    chosen = filter(result);

    while($.inArray(chosen, chosenJson) != -1) {
      chosen = filter(result);
    }
    chosenJson.push(chosen);

    parseData(chosen);
  }
  localStorage.setItem("random-result",JSON.stringify(chosen));
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

function parseData(chosen){
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
    //
    // $('.data').append(addedHTML);
    // $('.yelp').attr("href", url);
  
}

function initializePage() {
  $('.reroll').click(function(e){
    ga("send", "event", "reroll", "click");
  });
}
