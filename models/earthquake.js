var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var earthquakeSchema = new Schema({
    
    state: String,
    zone: {type: String, default:''},
    zoneinfo: {type: String, default:''}
});

module.exports  = mongoose.model('Earthquake', earthquakeSchema);
 
