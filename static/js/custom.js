
// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
});

/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: false
  });
  wow.init();

  // ------- JQUERY PARALLAX ---- //
  function initParallax() {
    $('#home').parallax("100%", 0.1);
    $('#gallery').parallax("100%", 0.3);
    $('#menu').parallax("100%", 0.2);
    $('#team').parallax("100%", 0.3);
    $('#contact').parallax("100%", 0.1);

  }
  initParallax();

  $('.btn').click(function(){
      $(this).css({
          background: '#FFFFFF',
          color: '#202020'
      });

      var href = $(this).attr('href');
      setTimeout(function() {window.location = href}, 600);
      return false;
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
