$(document).ready(function() {
    var first           = 1;
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input-fields-wrap"); //Fields wrapper
    var add_button      = $(".add-field-button"); //Add button ID

    var x = 1; //initlal text box count
    $(".add-field-button").click(function(){ //on add input button click
        event.preventDefault();
        if(checkInput()){
          addField();
          first = 0;
        }
        else{
          alert("Fill in input before adding.");
        }
    });

    $(wrapper).on("click",".add-field-button", function(){ //user click on remove text
        event.preventDefault();
        if(checkInput()){
          addField();
        }
        else{
          if(first == 0){
            alert("Fill in input before adding.");
          }
        }
    })

    /*
    $(wrapper).on("click",".remove-field", function(){ //user click on remove text
        event.preventDefault();
        console.log("hi");
        $(this).parent('span').parent('div').remove();
        x--;
    })*/

    function addField(){
      if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(".add-field-button").parent('span').replaceWith('<span class="check-buf"><input class="our-check" type="checkbox" value=""></span>')
            //$(".add-field-button").replaceWith('<input class="our-check" type="checkbox" value="">');
            $(wrapper).append('<div class="field-line"><span class="text-buf"><input class="res-field" type="text" name="mytext[]"/></span>' +
                              '<span class="btn-buf"><button class="add-field-button">+</button></span></div>'); //add input box
        }
    }

    function checkInput(){
      var input = $(".add-field-button").parent().siblings().children().val();
      console.log("input" + input);
      return $.trim(input)
    }

    $(".roll").click(function(){
        event.preventDefault();
        $('.res-field').each(function (){
          console.log($(this).val());
        });

        $.get("/yelpsearch/3?city=La%20Jolla", addData);
    })
});

function addData(result){
  console.log(result);
}
