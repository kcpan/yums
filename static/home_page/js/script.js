$(document).ready(function() {

  $('.pics').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    mobileFirst: true,
    adaptiveHeight: true
  });

  $('#groupcon').click(function() {
    var click = 1;
    if (click) {
      $('#groupcon').animate({
        height: '54%'
      });
      click = 0;
    } else {
      $('#groupcon').animate({
        height: '-=200px'
      });
      click=1;
    }
    $('html, body').animate({
  		scrollTop: $('#groupcon').offset().top
		}, 500);
    $('#groupvert').removeClass('vertCenter')
  });
});
