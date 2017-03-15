var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var soilSchema = new Schema({
    
    state: {
    	type: String,
    	unique: true
    },
    arid: {type: String, default:''},
    black: {type: String, default:''},
    laterite: {type: String, default:''},
    alluvial: {type: String, default:''},
    redYellow: {type: String, default:''},
    forestMountainous: {type: String, default:''},
    defaultTpye: {type: String, default:''}
    //defaultzone: {type: String, default: ''},
    //defaultsoil: {type: String, default: ''}
});

module.exports  = mongoose.model('Soil', soilSchema);
 
