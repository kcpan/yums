$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var count=6;


    // for(var i = 0; i < friendslist.length; i++) {
    //     var toadd = ' <li><label class="fbfriends checkbox-inline chex"><input type="checkbox" value=""><label>X</label>' + friendslist[i].name + '</label></li>';
    //     $(".checks").append(toadd);
    // }

    $(".roll").click(function(){
        event.preventDefault();

        var restrictions = [];
        var counter = 0;
        $('#resList').each(function (){
          counter++;

          console.log(counter);
          if($(this).is(":checked")) {
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
    });



    function checkInput(){
      var input = $(".add-field-button").parent().siblings().children().val();
      console.log("input" + input);
      return $.trim(input);
    }

});

function addData(result){
  console.log(result);
}
