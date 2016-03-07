$(document).ready(function() {
    var first           = 1;
    var max_fields      = 10; //maximum input boxes allowed
    var wrapper         = $(".input-fields-wrap"); //Fields wrapper
    var add_button      = $(".add-field-button"); //Add button ID
    var count=16;

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

    $(wrapper).on("click",".remove-field", function(){ //user click on remove text
        event.preventDefault();
        $(this).parent('span').parent('div').remove();
        x--;
    })

    function addField(){
      if(x < max_fields){ //max input box allowed
          x++; //text box increment
          $(".add-field-button").replaceWith('<button class="remove-field">X</button>');
          $(wrapper).append('<div class="field-line wow fadeInUp"><span class="text-buf"><input class="res-field" type="text" name="mytext[]"/></span>' +
                            '<span class="btn-buf"><button class="add-field-button">+</button></span></div>'); //add input box
      }
    }

    $(".roll").click(function(){
        event.preventDefault();

        var restrictions = [];
        $('.res-field').each(function (){
          if($(this).val()) {
            restrictions.push($(this).val());
          }
        });

        var chosen = {};
        var resJson = JSON.stringify(restrictions);
        console.log(resJson);
        localStorage.setItem("resJson",resJson);
        localStorage.setItem("random-result",JSON.stringify(chosen));

        $(this).css("background-color", "rgb(207, 75, 75)");
        $(this).css("color", "rgb(255, 255, 255)");


        var counter=setInterval(timer, 1000); //1000 will  run it every 1 second

        function timer()
        {
          count=count-1;

          if (count <= 0)
          {
             clearInterval(counter);
             //counter ended, do something here
             window.location = "/rand-result";
          }

          //Do code for showing the number of seconds here
           $(".roll").text(count); // watch for spelling
        }
    })



    function checkInput(){
      var input = $(".add-field-button").parent().siblings().children().val();
      console.log("input" + input);
      return $.trim(input)
    }
});

function addData(result){
  console.log(result);
}
