$(document).ready(function() {
  var numItems = 1;
  $(".add").click(function() {
      $("form > p:first-child").clone(true).insertBefore("form > p:last-child");
      numItems++;
      return false;
  });

  $(".remove").click(function() {
      if(numItems > 1) {
        $(this).parent().remove();
        numItems--;
      }
  });
});
