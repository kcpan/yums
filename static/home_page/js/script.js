$(document).ready(function() {
  var click = 1;
  $('.pics').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    mobileFirst: true
  });

  $('#groupcon').click(function() {
    if (click) {
      $('#groupcon').animate({
        height: '50%'
      });
      click = 0;
    } else {
      $('#groupcon').animate({
        height: '10%'
      });
      click=1;
    }
    $('html, body').animate({
  		scrollTop: $('#groupcon').offset().top
		}, 500);

    $('.fakepad').css({
      'height': '10%'
    });
  });


});
