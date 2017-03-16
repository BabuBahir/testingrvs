var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var earthquakeZoneSchema = new Schema({
    
    state: {
    	type: String,
    	unique: true
    },
    zoneOne: {type: String, default:''},
    zoneTwo: {type: String, default:''},
    zoneThree: {type: String, default:''},
    zoneFour: {type: String, default:''},
    zoneFive: {type: String, default:''},
    defaultTpye: {type: String, default:''}

});

module.exports  = mongoose.model('EarthquakeZone', earthquakeZoneSchema);
 