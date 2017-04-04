var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = new Schema({
  _id : String,
  surveyID : String,
  AssesmentStd : String , 
  buildingId: String,   
  userId: {
              _id :String
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
        _id : String,
        QuestionText : String,
        answer: String 
      }
  ],
  technicalInfoQuestions : [
    {
       _id : String,
        QuestionText : String,
        answer: String  
    }
  ],
  seismicAssessmentQuestions : [
    {
       _id : String,
        QuestionText : String,
        answer: String 
    }
  ], 
 
  ExistingDamageObserved : [{ _id : String }]  ,
  HistoryofEarlierDamage : [{ _id : String }]   ,

  building_type :  String ,
  buildingProfileImg: [ { imgUrl :String  , _id : String } ],
  buildingSketchImgs: [ { imgUrl :String  , _id : String } ],
  buildingDamageImgs: [ { imgUrl :String  , _id : String } ],
  survey_img : [ { imgUrl :String  , _id : String } ],
  basicInfo : {
    buildingName: String,
    ownerName: String,
    streetAddr: String,
    city : String,
    state:String,
    pincode: Number,
    LocalAuthority : String,
    District : String ,
    Latitude : String,
    longitude: String,
    EarthquakeZone : String,
    SoilGrade  : String,
    aadharCardNo: String 
  },
  ExpertComment: { type: String, default: "" }

  
});

module.exports  = mongoose.model('Survey', SurveySchema);
 