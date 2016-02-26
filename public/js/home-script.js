// preloader
$(window).load(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets
});

/* HTML document is loaded. DOM is ready.
-------------------------------------------*/
$(function(){

  // FB.getLoginStatus(function(response){
  //   if (response.status === 'connected') {
  //     console.log('Logged in.');
  //   }
  // });

  // ------- WOW ANIMATED ------ //
  wow = new WOW(
  {
    mobile: true
  });
  wow.init();

  $('.chex').click(function(){
    $(this).parents('li').remove();
  });

  var creating = 0;
  var joining = 0;


  $('#createBtn').click(function(){
    if(creating == 0){
      creating = 1;
        $(this).css({
            background: '#FFFFFF',
            color: '#202020'
        });

        $('#create').css({
            height: 'calc(95vh - 50px)'
        });
        $('#join').css({
            height: '0'
        });
        $('#joinBtn').hide();

        $('#create .buttonHold').animate({
            top: '10%'
        },400, function(){
            $('.hider').removeClass('hidden');
            $('#createBtn').text('BACK');
            $('#createBtn').css({width: '40vw'});
            $('#createBtn').attr('id', 'crtBack');
        });
      }
    });

    $(document).on('click','#crtBack',function(){
      creating = 0;
      $(this).css({
          background: 'transparent',
          color: 'white'
      });
      $('#create').css({
          height: 'calc(47.5vh - 25px)'
      });
      $('#join').css({
          height: 'calc(47.5vh - 25px)'
      });
      $('.hider').addClass('hidden');
      $('#joinBtn').show();
      $('#crtBack').css({width: '60vw'});
      $('#crtBack').attr('id', 'createBtn');
      setTimeout(function() {$('#createBtn').text('CREATE A ROOM');},400);
      $('#create .buttonHold').animate({
          top: '50%'
      },400);
  });

  $('#joinBtn').click(function(){
    if(joining == 0){
      joining = 1;
        $(this).css({
            background: '#FFFFFF',
            color: '#202020'
        });

        $('#join').css({
            height: 'calc(95vh - 50px)'
        });
        $('#create').css({
            height: '0'
        });
        $('#createBtn').hide();

        $('#join .buttonHold').animate({
            top: '10%'
        },400, function(){
            $('#joinBtn').text('BACK');
            $('#joinBtn').css({width: '40vw'});
            $('#joinBtn').attr('id', 'joinBack');
            $('.hider2').removeClass('hidden');
        });
      }
    });

    $(document).on('click','#joinBack',function(){
      joining = 0;
      $(this).css({
          background: 'transparent',
          color: 'white'
      });
      $('#join').css({
          height: 'calc(47.5vh - 25px)'
      });
      $('#create').css({
          height: 'calc(47.5vh - 25px)'
      });
      $('.hider2').addClass('hidden');
      $('#createBtn').show();
      $('#joinBack').css({width: '60vw'});
      $('#joinBack').attr('id', 'joinBtn');
      setTimeout(function() {$('#joinBtn').text('JOIN A ROOM');},400);
      $('#join .buttonHold').animate({
          top: '50%'
      },400);
  });


    $('#finCreate').click(function(){
        $(this).css({
            background: '#FFFFFF',
            color: '#202020'
        });
        var href = '/random'
        setTimeout(function() {window.location = href}, 600);
    });

    $('#finJoin').click(function(){
        $(this).css({
            background: '#FFFFFF',
            color: '#202020'
        });
        var coin = Math.random();
        var href = ''
        if (coin > 0.5) {
          var href = '/random'
        } else {
          var href = '/vote'
        }
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
