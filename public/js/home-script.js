
// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
});

/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){

  var isCreate = 0;

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: true
  });
  wow.init();

  $('#createBtn').click(function(){
      $(this).css({
          background: '#FFFFFF',
          color: '#202020'
      });

      $('#create .buttonHold').animate({
          top: '10%'
      },400, function(){
        $('#create').css({
            height: 'calc(95vh - 50px)'
        });
        $('#join').css({
            height: '0'
        });
        $('#joinBtn').hide();
        $('.hider').removeClass('hidden');
      });
    });

    $('#finCreate').click(function(){
        $(this).css({
            background: '#FFFFFF',
            color: '#202020'
        });
        var href = '/random'
        setTimeout(function() {window.location = href}, 600);
    });
  // HIDE MOBILE MENU AFTER CLIKING ON A LINK
  $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });
  var open = 0;
  $('.navbar-toggle').click(function(){
    if(open==1)
    {
      $(".navbar-collapse").collapse('hide');
      open = 0;
    }
    else {
      open = 1;
    }
  });
});
