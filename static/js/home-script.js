$(document).ready(function() {
  var click = 1;
  $('.pics').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    mobileFirst: true
  });
  $('.group').css('transform','translateY(-50%)');

  $('#groupcon').click(function() {
    if (click) {
      $('#groupcon').animate({
        height: '50%'
      },750);
      $('.group').animate({
        top: '10%'
      },750);
      click = 0;
      $('html, body').animate({
        scrollTop: $('#groupcon').offset().top
      }, 750 );
      $('.group').text('CREATE GROUP -');
    } else {
      $('#groupcon').animate({
        height: '10%'
      },750 );
      $('.group').animate({
        top: '50%'
      },750);
      click=1;
      $('html, body').animate({
        scrollTop: $('#fakepad').offset().top
      }, 750);
      $('.group').text('CREATE GROUP +');
    }

  });


});
