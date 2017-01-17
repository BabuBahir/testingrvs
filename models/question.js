var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var questionSchema = new Schema({
    questionType: String,
    question: {
        text: {
            Hindi: String,
            English: String,
            Gujarati: String
        },
        options: [{
            Hindi: String,
            English: String,
            Gujarati: String
        }]
    },
    needAssistance: {
        title: {
            
                Hindi: String,
                English: String,
                Gujarati: String
            
        },
        description: {
            
                Hindi: String,
                English: String,
                Gujarati: String
            
        },
        questionImgUrl:[{imgUrl: String, _id : String}],
        questionVideoUrl: [{videoUrl : String , _id : String}] 
    },
    buildingsAssociated: [{
        type: Schema.Types.ObjectId, 
        ref: 'BuildingType'
    }]    

});

module.exports  = mongoose.model('question', questionSchema);
 
