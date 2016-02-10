$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add_field_button"); //Add button ID

    var x = 1; //initlal text box count
    $(".add_field_button").click(function(){ //on add input button click
        event.preventDefault();
        addField();
    });

    $(wrapper).on("click",".add_field_button", function(){ //user click on remove text
        event.preventDefault();
        addField();
    })

    $(wrapper).on("click",".remove_field", function(){ //user click on remove text
        event.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

    function addField() {
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(".add_field_button").replaceWith('<button class="remove_field">Remove</button>');
          $(wrapper).append('<div><input class="res-field" type="text" name="mytext[]"/><button class="add_field_button">Add</button></div>'); //add input box
      }
    }
});
