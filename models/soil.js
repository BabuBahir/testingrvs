var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var soilSchema = new Schema({
    
    state: {
    	type: String,
    	unique: true
    },
    arid: {type: String },
    black: {type: String },
    laterite: {type: String },
    alluvial: {type: String },
    redYellow: {type: String },
    forestMountainous: {type: String },
    defaultTpye: {type: String }
    //defaultzone: {type: String, default: ''},
    //defaultsoil: {type: String, default: ''}
});

module.exports  = mongoose.model('Soil', soilSchema);
 
