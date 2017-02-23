var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  buildingId: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registersurveyer'
  },
  dateTime: String,
  status: {
    type: String,
    enum: ['Draft', 'Submitted', 'ReviewRequest','Review Completed'],
    default: 'Draft'
  },
  surveyLanguage:String,
  generalInfoQuestions : [
      {
        questionId : String,
        answer: String 
      }
  ],
  technicalInfoQuestions : [
    {
      questionId : String,
      answer: String 
    }
  ],
  seismicAssessmentQuestions : [
    {
      questionId : String,
      answer: String 
    }
  ],
  buildingTypeId : 
             {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'BuildingType'
             },
  buildingProfileImg: {imgUrl :String},
  buildingSketchImgs: [{imgUrl :String}],
  buildingDamageImgs: [{imgUrl :String}],
  survey_img : [ { imgUrl :String  , _id : String } ],
  basicInfo : {
    buildingName: String,
    ownerName: String,
    streetAddr: String,
    city : String,
    state:String,
    pincode: Number,
    LocalAuthority : String,
    Latitude : String,
    longitude: String,
    EarthquakeZone : String,
    SoilGrade  : String,
    aadharCardNo: String 
  },
  ExpertComment: String
});

module.exports  = mongoose.model('Survey', SurveySchema);
 
