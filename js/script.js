var windowHeight = $(window).innerHeight();
var windowWidth = $(window).innerWidth();

$(document).ready(function() {

  var images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg'];

  $('body').css({
    'background-image': 'url(./img/' + images[Math.floor(Math.random() * images.length)] + ')'
  });
  $('body').css({
    'background-repeat': 'no-repeat'
  });
  $('body').css({
    'background-position': 'center center'
  });
});
