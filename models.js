
var Mongoose = require('mongoose');


var RoomSchema = new Mongoose.Schema({
  // fields are defined here
  "room_name": String,
  "type": Boolean, // true for random, false for vote
  "members": [{"name": String, "fb_id": Number}],
  "restrictions": [{"category": String}],
  "votes": [{"place": String, "votes": Number}]
});

exports.Room = Mongoose.model('Room', RoomSchema);
