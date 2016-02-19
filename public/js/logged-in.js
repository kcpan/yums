$(document).ready(function() {
  initializePage();
});

function initializePage(){
  window.onload = function(){
    console.log("hi");
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        window.location = "/home";
        console.log('Logged in.');
      }
    });
  }
}
