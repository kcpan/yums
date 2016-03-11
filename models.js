
var Mongoose = require('mongoose');


var RoomSchema = new Mongoose.Schema({
  // fields are defined here
  "room_name": String,
  "type": Boolean, // true for random, false for vote
  "done": Boolean,
  "master": {"name": String, "fb_id": Number},
  "members": [{"name": String, "fb_id": Number}],
  "restrictions": [{"category": String}],
  "votes": [{"place": String, "votes": Number, "who": [{"name": String, "fb_id": Number}]}]
});

exports.Room = Mongoose.model('Room', RoomSchema);
