
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
    mobile: true
  });
  wow.init();

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
