var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name:  String,
  email: String,
  phone: String,
  password :  String,
  designation : String,
  verified : Boolean,
  profilePicUrl : String,
  status : String,
  profileCreatedOn : Date
});

module.exports = mongoose.model('User', userSchema);
  
