window.onload = markRoomRestrictions;
var roomName = JSON.parse(localStorage.getItem("roomRestrictions")).room_name;
var roomMaster = JSON.parse(localStorage.getItem("roomRestrictions")).master;
var roomUser = JSON.parse(localStorage.getItem("roomRestrictions")).fb_id;
var roomRestrictions = JSON.parse(localStorage.getItem("roomRestrictions")).restrictions;

$(document).ready(function() {
    var max_fields      = 10; //maximum input boxes allowed
    var count=6;

    $("input[type='checkbox']").change(function() {
      console.log(roomRestrictions);
      if($(this).prop('checked')) {
        roomRestrictions.push({"category": $(this).val()});
      }

      var json = {
        'room_name': roomName,
        'done': false,
        'category': $(this).val(),
        'checked': $(this).prop('checked'),
        'restrictions': roomRestrictions
      };

      $.post('/database/updateRestrictions', json, function(res) {
          roomRestrictions = res;

          var json = {
            'room_name': roomName,
            'master': roomMaster,
            'fb_id': roomUser,
            'restrictions': roomRestrictions
          };
          localStorage.setItem("roomRestrictions", JSON.stringify(json));
			});
    });
    // for(var i = 0; i < friendslist.length; i++) {
    //     var toadd = ' <li><label class="fbfriends checkbox-inline chex"><input type="checkbox" value=""><label>X</label>' + friendslist[i].name + '</label></li>';
    //     $(".checks").append(toadd);
    // }

    $(".roll").click(function() {
        event.preventDefault();
        $.get("/yelpsearch/3?term=food&city=La%20Jolla", addData);
        executeRoll();
    });

    function checkInput() {
      var input = $(".add-field-button").parent().siblings().children().val();
      console.log("input" + input);
      return $.trim(input);
    }

    setInterval(updateRoomRestrictions, 1000);
});

function addData(result) {
  var chosen = filter(result);
  localStorage.setItem("random-result",JSON.stringify(chosen));
  //$.get('/database/roll');
  var json = {
    'room_name': roomName,
    'done': true,
    'category': "",
    'checked': false,
    'restrictions': roomRestrictions
  };

  $.post('/database/updateRestrictions', json, function(res) {
      roomRestrictions = res;

      var json = {
        'room_name': roomName,
        'master': roomMaster,
        'fb_id': roomUser,
        'restrictions': roomRestrictions
      };
      localStorage.setItem("roomRestrictions", JSON.stringify(json));
  });
  executeRoll();
}

function markRoomRestrictions() {
  var json = JSON.parse(localStorage.getItem("roomRestrictions"));
  console.log(json);
  roomName = json.room_name;
  roomMaster = json.master;
  roomUser = json.fb_id;
  roomRestrictions = json.restrictions;

  if(roomUser != roomMaster.fb_id) {
    $('#rdy-btn').hide();
    $('#rdy-btn').disabled = true;
  }

  $("input[type='checkbox']").each(function () {
    //console.log($(this).val());
    for(var i = 0; i < roomRestrictions.length; i++) {
      if($(this).val() == roomRestrictions[i].category) {
        $(this).prop("checked", true);
      }
    }
  });
}

function updateRoomRestrictions() {
  function updateInfo(room_json) {
    console.log(room_json);
    roomRestrictions = room_json.restrictions;
    var done = room_json.done;

    if(done) {
      executeRoll();
    }

    $("input[type='checkbox']").each(function () {
      //console.log($(this).val());
      for(var i = 0; i < roomRestrictions.length; i++) {
        if($(this).val() == roomRestrictions[i].category) {
          $(this).prop("checked", true);
        }
      }
    });
  }

  $.get('/database/info/' + roomName, updateInfo);
}

function executeRoll(){
  var restrictions = [];

  $('li .box').each(function (){
    console.log($(this).text());
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
    $('#rdy-btn').show();
    //Do code for showing the number of seconds here
     $(".roll").text(count); // watch for spelling
  }
}

function filter(result){
  var chosen;
  var restr = JSON.parse(localStorage.getItem("resJson"));
  console.log(restr);

  console.log(result);
  var businesses = result['businesses'];

  var done = false;
  while(!done) {
    chosen = businesses[Math.floor(businesses.length * Math.random())];

    done = true;
    var categories = chosen.categories;
    var tags = "";

    for(var i=0; i<categories.length; i++) {
      var inner = categories[i];

      for(var j=0; j<inner.length; j++) {
        tags = tags.concat(inner[j] + " ");
      }
    }

    for(var i=0; i<restr.length; i++) {
      if(tags.search(restr[i]) != -1) {
        console.log("conflict!");
        done = false;
      }
    }
  }

  return chosen;
}
