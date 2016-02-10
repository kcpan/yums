$(document).ready(function() {
  var click = 1;
  $('.pics').slick({
    autoplay: true,
    prevArrow: null,
    nextArrow: null,
    mobileFirst: true
  });
  $('.group').css('transform','translateY(-50%)');

  $('#groupvert').click(function() {
    if (click) {
      $('#groupcon').animate({
        height: '50%',
      },{
        duration: 750,
        complete: function(){
          $('.group').text('CREATE GROUP -');
          $('.grpSelect').text('Your Friends will show up here!');
        }
      }
    );
      $('.bHold').animate({
        height: '40%'
      },750);
      $('.instructions').animate({
        height: '0%'
      },750);
      $('.group').animate({
        top: '10%'
      },750);

      click = 0;

      $('html, body').animate({
        scrollTop: $('#groupcon').offset().top
      }, 750 );
    } else {
      $('#groupcon').animate({
        height: '10%',
      },{
        duration: 750,
        complete: function(){
          $('.group').text('CREATE GROUP +');
        }
      }
    );
      $('.bHold').animate({
        height: '0%'
      },750);
      $('.group').animate({
        top: '50%'
      },750);
      $('.instructions').animate({
        height: '42%'
      },750);
      click=1;
      $('html, body').animate({
        scrollTop: $('#fakepad').offset().top
      }, 750);
      $('.grpSelect').text('');
    }

  });


});
