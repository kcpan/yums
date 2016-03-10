var models = require('../models');

exports.checkRoom = function(req, res) {
  var roomName = req.params.id;

  models.Room
    .find({"room_name":roomName})
    .exec(afterQuery);

    function afterQuery(err, rooms) {
      if(err) console.log(err);
      if(rooms[0]) {
        res.json('taken');
      }
      else {
        res.json('free');
      }
    }
}

exports.joinRoom = function(req, res) {
  var roomName = req.params.id;

  models.Room
    .find({"room_name":roomName})
    .exec(afterQuery);

    function afterQuery(err, rooms) {
      if(err) console.log(err);
      res.json(rooms[0]);
    }
}

exports.createRoom = function(req, res) {
   var form_data = req.body;
   console.log(form_data);

   var newRoom = new models.Room({
     "room_name": form_data.room_name,
     "type": form_data.type,
     "members": form_data.members,
     "restrictions": form_data.restrictions,
     "votes": form_data.votes
   })

   newRoom.save(afterSaving);

   function afterSaving(err, projects) {
      if(err) {
        console.log(err);
        res.send(500);
      }

      if(form_data.type) {
        res.redirect('/random');
      }
      else {
        res.redirect('/vote');
      }
   }
}

exports.getRooms = function(req, res) {
  var userid = req.params.id;

  models.Room
    .find({"members.fb_id": userid})
    .exec(afterQuery);

    function afterQuery(err, rooms) {
      if(err) console.log(err);
      res.json(rooms);
    }
}

exports.updateRoomRestriction = function(req, res) {
  var form_data = req.body;
  var oldRes = form_data.restrictions;

  if(form_data.checked == 'true') {
    models.Room
      .findOneAndUpdate({"room_name": form_data.room_name},
                        {"restrictions": oldRes},
                        {upsert:true}, afterUpdate);
  }
  else {
    var newRes = [];
    for(var i = 0; i < oldRes.length; i++) {
      if(oldRes[i].category != form_data.category) {
        newRes.push(oldRes[i]);
      }
    }
    console.log(newRes);
    models.Room
      .findOneAndUpdate({"room_name": form_data.room_name},
                        {"restrictions": newRes},
                        {upsert:true}, afterUpdate);
  }

  function afterUpdate(err, doc) {
    if (err) return res.send(500, { error: err });
    if(form_data.checked == 'true') {
      return res.send(oldRes);
    }
    else {
      return res.send(newRes);
    }
  }
}

exports.updateRoomVoteOptions = function(req, res) {
  var form_data = req.body;
  console.log(form_data.votes);
  models.Room
    .findOneAndUpdate({"room_name": form_data.room_name},
                      {"votes": form_data.votes},
                      {upsert:true}, afterUpdate);

  function afterUpdate(err, doc) {
    if (err) return res.send(500, { error: err });
    return res.send(form_data.votes);
  }
}

exports.updateRoomVoteCount = function(req, res) {
  var form_data = req.body;
  
}
