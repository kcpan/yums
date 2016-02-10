$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input-fields-wrap"); //Fields wrapper
    var add_button      = $(".add-field-button"); //Add button ID

    var x = 1; //initlal text box count
    $(".add-field-button").click(function(){ //on add input button click
        event.preventDefault();
        addField();
    });

    $(wrapper).on("click",".add-field-button", function(){ //user click on remove text
        event.preventDefault();
        addField();
    })

    $(wrapper).on("click",".remove-field", function(){ //user click on remove text
        event.preventDefault();
        $(this).parent('div').remove();
        x--;
    })

    function addField() {
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(".add-field-button").replaceWith('<button class="remove-field">Remove</button>');
          $(wrapper).append('<div class="field-line"><span><input class="res-field" type="text" name="mytext[]"/></span><button class="add-field-button">Add</button></div>'); //add input box
      }
    }
});
