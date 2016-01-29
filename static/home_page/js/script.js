$(document).ready(function() {
  var click = 1;
  $('.pics').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    mobileFirst: true,
    adaptiveHeight: true
  });

  $('#groupcon').click(function() {
    if (click) {
      $('#groupcon').animate({
        height: '54%'
      });
      $('#groupvert').removeClass('vertCenter')
      click = 0;
    } else {
      $('#groupcon').animate({
        height: '10%'
      });
      $('#groupvert').addClass('vertCenter')
      click=1;
    }
    $('html, body').animate({
  		scrollTop: $('#groupcon').offset().top
		}, 500);
  });
});
