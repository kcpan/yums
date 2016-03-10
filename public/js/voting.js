window.onload = markRoomVotes;
var roomName = JSON.parse(localStorage.getItem("roomRestrictions")).room_name;
var roomVotes = JSON.parse(localStorage.getItem("roomRestrictions")).votes;
var username = JSON.parse(localStorage.getItem("FBInfo")).username;
var userid = JSON.parse(localStorage.getItem("FBInfo")).userid;

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
        var newInput = checkInput();
        if(newInput){
          addField(newInput);
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

    function addField(input){
      if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(".add-field-button").parent('span').replaceWith('<span class="check-buf"><input class="our-check" type="checkbox" value=""></span>')
            //$(".add-field-button").replaceWith('<input class="our-check" type="checkbox" value="">');
            $(wrapper).append('<div class="field-line wow fadeInUp"><span class="text-buf"><input class="res-field" type="text" name="mytext[]"/></span>' +
                              '<span class="btn-buf"><button class="add-field-button">+</button></span></div>'); //add input box

            roomVotes.push({'place': input, 'votes': 0});

            var json = {
              'room_name': roomName,
              'votes': roomVotes
            }
            console.log(json);
            $.post('/database/updateVoteOptions', json, function(res) {
                roomVotes = res;

                var json = {
                  'room_name': roomName,
                  'restrictions': roomVotes
                };
                localStorage.setItem("roomVotes", JSON.stringify(json));
      			});
        }
    }

    function checkInput(){
      var input = $(".add-field-button").parent().siblings().children().val();
      console.log("input" + input);
      return $.trim(input)
    }

    $(".roll").click(function(){
        event.preventDefault();

        var votes = [];
        $('.field-line').each(function (){
          var place = $(".res-field", this).val();
          var checked = $(".our-check", this).is(":checked");
          if(place){
            votes.push({restaurant:place, check:checked});
            localStorage.clear();
          }
        });

        var voteJson = JSON.stringify(votes);
        localStorage.setItem("voteJson",voteJson);
        //$.get("/yelpsearch/3?city=La%20Jolla", addData);
    })

    /*
    $('input[type="checkbox"]').change(function(){
      this.value = (Number(this.checked));
    });


    $(".our-check").click(function() {
      var total = 0;
      $(':checkbox:checked.our-check').each(function() {
          total += +this.value;
      });
      // alert(total);
    });*/
});

function addData(result){
  console.log(result);
}

function markRoomVotes() {
  var json = JSON.parse(localStorage.getItem("roomVotes"));
  var fbinfo = JSON.parse(localStorage.getItem("FBInfo"));
  roomName = json.room_name;
  roomVotes = json.votes;
  username = fbinfo.username;
  userid = fbinfo.userid;

  var check = "";
  for(var i = 0; i < roomVotes.length; i++) {
    var who = roomVotes[i].who
    for(var j = 0; j < who.length; j++) {
      if(userid == who[j].fb_id) {
        check = "checked";
      }
    }

    $(".input-fields-wrap").append(
      '<div class="field-line wow fadeInUp">' +
        '<span class="text-buf">' +
          '<input class="res-field" type="text" name="mytext[]" value="' + roomVotes[i].place + '">'+
        '</span>' +
        '<span class="check-buf">' +
          '<input class="our-check" type="checkbox" name="vote-' + roomVotes[i].place + '" value="' + roomVotes[i].place + '"' + check + '>' +
        '</span>' +
      '</div>');
  }

  $(".input-fields-wrap").append(
  '<div class="field-line wow fadeInUp">' +
    '<span class="text-buf"><input class="res-field" type="text" name="mytext[]"></span>' +
    '<span class="btn-buf"><button class="add-field-button">+</button></span>' +
  '</div>');
}
