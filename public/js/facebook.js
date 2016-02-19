$(document).ready(function() {
  initializePage();
});

var userid;

function initializePage(){
  $(".loginBtn").click(function(){
    event.preventDefault();
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        window.location = "/home";
        console.log('Logged in.');
      }
      else {
        FB.login(function(response) {
          statusChangeCallback(response);
        }, {scope: 'public_profile,user_friends,email'});
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

  window.onload = function(){
    FB.getLoginStatus(function(response) {
      if (response.status == 'connected') {
        FB.api('/me', {fields: "id,name,picture,friends"}, function(response) {
          console.log('Successful login for: ' + JSON.stringify(response));
          if (response && !response.error) {
            userid = response.id;
            $(".fbname").text(response.name);
            $(".fbimage").attr("src", response.picture.data.url);
          }
        });
        /*
        FB.api("/me/?fields=picture&type=normal", function (response) {
          console.log(JSON.stringify(response));
          if (response && !response.error) {
            console.log("pls");
            $(".fbimage").attr("src", (response.picture).data.url);
          }
        });
        FB.api("/" + userid + "/picture?type=square", function (response) {
          console.log((response.data).url);
          if (response && !response.error) {
            console.log("pls");
            $(".fbimage").attr("src", (response.data).url);
          }
        });*/
      }
    });
  }
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

    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,user_friends,email'});
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    //document.getElementById('status').innerHTML = 'Please log ' +
    //  'into Facebook.';
    console.log("pls");
    FB.login(function(response) {
      statusChangeCallback(response);
    }, {scope: 'public_profile,user_friends,email'});
  }
}
