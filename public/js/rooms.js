var roomList = [];

  $('#finCreate').click(function() {
    var hasName = false;
    var hasRad = false;
    var alertMsg = "";

    var roomName;
    var type;
    var members = [];
/*
    $('#added').find('li').each(function() {
      var current = $(this);
      members.push(current.)
    });*/

    if($('#crtID').val()) {
      hasName = true;
      roomName = $('#crtID').val();
    }
    else {
      hasName = false;
      alertMsg = alertMsg.concat("Room ID");
    }

    if($('#randRad').is(':checked')) {
      hasRad = true;
      type = true;
    }
    else if($('#voteRad').is(':checked')) {
      hasRad = true;
      type = false;
    }
    else {
      hasRad = false;
      if(alertMsg.length < 7) {
        alertMsg = alertMsg.concat("Mode");
      }
      else {
        alertMsg = alertMsg.concat(" and Mode");
      }
    }

    if(hasName && hasRad) {
			function createRoom(check) {
				console.log(check);
				if(check == 'taken') {
					alert("Room name taken, please choose another name.");
				}
				else {
					FB.getLoginStatus(function(response) {
						if (response.status == 'connected') {
							FB.api('/me?fields=id,name,first_name,picture.width(480).height(480),friends', function(response) {
								console.log('Successful login for: ' + JSON.stringify(response));
								if (response && !response.error) {
									userid = response.id;
									username = response.name;
                  var memberList = [{"name": username, "fb_id": userid}];

                  $('.fbfriends').each(function () {
                    var friendslist = response.friends.data
                    for(var i = 0; i < friendslist.length; i++) {
                      var temp = $(this).text();
                      var friendName = temp.slice(1, temp.length);

                      if(friendName == friendslist[i].name) {
                        memberList.push({"name": friendslist[i].name, "fb_id": friendslist[i].id})
                      }
                    }
                  });

									var json = {
										'room_name': roomName,
										'type': type,
										"members": memberList,
										'restrictions': [{"category": ""}],
										'votes': [{"place": "", "votes": 0}]
									};

									$.post('/database/create', json, function() {
										if(type) {
                      var json = {
                        'room_name': roomName,
                        'restrictions': [{"category": ""}]
                      }
  										localStorage.setItem("roomRestrictions", JSON.stringify(json));
											setTimeout(function() {window.location = '/random'}, 600);
										}
										else {
                      var json = {
                        'room_name': name,
                        'votes': [{"place": "", "votes": 0}]
                      }
  										localStorage.setItem("roomVotes", JSON.stringify(json));
											setTimeout(function() {window.location = '/vote'}, 600);
										}
									});
								}
							});
						}
					});
				}
			}

			$.get('/database/check/' + roomName, createRoom)
    }
    else {
      var str = "Please fill out ";
      alertMsg = str.concat(alertMsg, ".");
      alert(alertMsg);
    }
  });

	$('#finJoin').click(function() {
		if($('#joinID').val()) {
      var roomName = $('#joinID').val();

			function joinOrDeny(room_json) {
        var name = room_json['room_name'];
				var type = room_json['type'];
				var members = room_json['members'];
				var isin = false;

				FB.getLoginStatus(function(response) {
					if (response.status == 'connected') {
						FB.api('/me?fields=id,name,first_name,picture.width(480).height(480),friends', function(response) {
							console.log('Successful login for: ' + JSON.stringify(response));
							if (response && !response.error) {
								userid = response.id;

								for(var i = 0; i < members.length; i++) {
									if(members[i].fb_id == userid) {
										isin = true;
										break;
									}
								}

								if(isin) {
									if(type) {
										var restrictions = room_json['restrictions'];
										var json = {
                      'room_name': name,
                      'restrictions': restrictions
                    }
										localStorage.setItem("roomRestrictions", JSON.stringify(json));
										setTimeout(function() {window.location = '/random'}, 600);
									}
									else {
										var votes = room_json['votes'];
                    var json = {
                      'room_name': name,
                      'votes': votes
                    }
										localStorage.setItem("roomVotes", JSON.stringify(json));
										setTimeout(function() {window.location = '/vote'}, 600);
									}
								}
								else {
									alert('You are not a member of this room.');
								}
							}
						});
					}
				});
			}

			$.get('/database/join/' + roomName, joinOrDeny);
    }
    else {
      alert('Please enter a Room Name.');
    }
	});

	$('#joinBtn').click(function() {
		function fillInfo(room_json){

      if(roomList.length == 0) {
        for(var i = 0; i < room_json.length; i++) {
          roomList.push(room_json[i].room_name);
        }
      }

      console.log(roomList);
		}

		FB.getLoginStatus(function(response) {
			if (response.status == 'connected') {
				FB.api('/me?fields=id,name,first_name,picture.width(480).height(480),friends', function(response) {
					console.log('Successful login for: ' + JSON.stringify(response));
					if (response && !response.error) {
						userid = response.id;
		        $.get('/database/' + userid, fillInfo);
					}
				});
			}
		});
	});

  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  };

  $('#joinDiv .typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 0,
    limit: 10,
    classNames: {menu: "dropdown-menu"}
  },
  {
    name: 'rooms',
    source: substringMatcher(roomList)
  });
