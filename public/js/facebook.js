var userid;
var username;
var friendslist=[];

$(document).ready(function() {
  initializePage();
});



function initializePage(){
  $(".loginBtn").click(function(){
    event.preventDefault();
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        window.location = "/home";
        console.log('Logged in.');
      }
      else {
        /*
        FB.login(function(response) {
          statusChangeCallback(response);
        }, {scope: 'public_profile,user_friends,email'});*/
        logMeIn();
      }
    });
  });

  $(".logoutBtn").click(function(){
    event.preventDefault();
    FB.getLoginStatus(function(response) {
      if (response && response.status === 'connected') {
        FB.logout(function(response) {
          document.location.reload();
        });
      }
    });
  });

  $('.fbname').bind("facebook:init", function(){
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        FB.api('/me?fields=id,name,first_name,picture.width(480).height(480),friends', function(response) {
          console.log('Successful login for: ' + JSON.stringify(response));
          if (response && !response.error) {
            userid = response.id;
            $(".fbname").text("Hello, " + response.name);
            $(".fbimage").attr("src", response.picture.data.url);

            console.log(response.friends.data);
            var temp = response.friends.data;
            for(var i = 0; i < temp.length; i++) {           
              friendslist.push(temp[i].name);
            }
          }
        });
      }
    });
  });

}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status == 'connected') {
    // Logged into your app and Facebook.
    //$.get("home");
    window.location = "/home"
    console.log("logged in");
  } else if (response.status == 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    //document.getElementById('status').innerHTML = 'Please log ' +
    //  'into this app.';

    /*
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,user_friends,email'});*/
    logMeIn();
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //document.getElementById('status').innerHTML = 'Please log ' +
    //  'into Facebook.';
    console.log("pls");
    /*
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,user_friends,email'});*/
    logMeIn();
  }
}

function logMeIn()
{
  var paramsLocation=window.location.toString().indexOf('?');
  var params="";
  if (paramsLocation>=0)
    params=window.location.toString().slice(paramsLocation);

  top.location = 'https://graph.facebook.com/oauth/authorize?'+
    'client_id=776597119112980&scope=public_profile,user_friends,email&redirect_uri=http://yumsapp.herokuapp.com/home'+params;
}
