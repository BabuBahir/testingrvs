var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./controller');
var login = require('./login');
var questionController = require('./questionController');
var earthquake = require('./earthquake');
var Registersurveyer = require('../models/registersurveyer');
var Survey = require('../models/survey');
var BuildingType = require('../models/buildingType');

module.exports = function(app) {
//app.use(express.limit(100000000));
    
    app.get('/', function(req, res) { 
        res.render('admin_Sign-In.html');
    });
    /*
    app.get('/earthquakeSurvey', function(req, res) { 
        res.render('earthquake');
    });
    app.get('/editEarthquake', function(req, res) { 
        res.render('editEarthquake');
    });
    */
    app.post('/addEarthquake', earthquake.addInfo);
    app.post('/updateInfo', earthquake.updateInfo);
    app.get('/viewReport', earthquake.viewInfo);
 
    app.get('/user_management',requireLogin,function(req,res){
        var moment = require('moment');
        Registersurveyer
        .find()
        .exec()
        .then(function (user) {
            registerUser = user;
            // console.log(user)
            return Survey
            .find()
            .exec()
        })
        .then(function (surveyDetails) {
          // console.log(surveyDetails)
          res.render("user_Management.html", {
            surveyData: surveyDetails,
            registersurveyer: registerUser,
            moment: moment
          })
        })
        .catch(function (err) {
          console.log(err);
          return res.json({error: true, reason: err});
        })
    });

    app.get('/index',function(req,res){
        res.render('index.html');
    });


    app.put('/expert_comment_added',function(req,res){                                                            
        var dataId = req.body.id
        var expertComment = req.body.ecomment

        // console.log(dataId)
        // console.log(expertComment)
        Survey
        .findOne({_id: dataId})
        .exec()
        .then(function(surveydata){
            // console.log(surveydata)
             surveydata.ExpertComment = expertComment;
             surveydata.status = 'Review Completed';
             surveydata.save();
             return res.json({error: false});
        })
        .catch(function (err) {
          console.log(err);
          return res.json({error: true, reason: err});
        })

    });


      app.get('/survey_details/:id?',function(req,res){
        var dataId = req.params.id
        // console.log(dataId)
        Registersurveyer
        .find()
        .exec()
        .then(function (user) {
            registerUser = user;
            // console.log(user)
            return Survey
            .findOne({_id: dataId})
            .exec()
        })       
        .then(function(surveyResult){
            // console.log(surveyResult)
             res.render("survey_details_view", {
            surveyData: surveyResult,
            allRegister: registerUser

          })
        })
        .catch(function (err) {
          console.log(err);
          return res.json({error: true, reason: err});
        })
        // console.log(dataId)
        
    });

    app.delete('/survey_delete',function(req,res){
        var dataId = req.body.id
        // console.log(dataId)
         Survey
         .remove({_id: dataId})
         .exec()
         .then(function(){
             return res.json({error: false});
        })
        .catch(function (err) {
          console.log(err);
          return res.json({error: true, reason: err});
        })
            
    });



    app.get('/survey',requireLogin, function(req,res){
       var moment = require('moment');
        Registersurveyer
        .find()
        .exec()
        .then(function (user) {
            registerUser = user;
            // console.log(user)
            return BuildingType
            .find()
            .exec()
        })
        .then(function (buildingdata) {
            building = buildingdata
            // console.log(user)
            return Survey
            .find()
            .exec()
        })
      .then(function (surveyDetails) {
        // console.log(surveyDetails)
        // console.log(surveyDeta)
      res.render("survey_Management.html", {
        surveyData: surveyDetails,
        registersurveyer: registerUser,
        buildingType: building, 
        moment: moment
      })
    })
    .catch(function (err) {
      console.log(err);
      return res.json({error: true, reason: err});
    })
});  


    app.get('/buildingType',controller.index);

    app.get('/generalInfo',questionController.getQuestions);     

    app.get('/general_techincal',questionController.getQuestions_technical);
    
    app.get('/surveyquestions', questionController.getSurveyQuestions);

    app.get('/seismic_Assessment',requireLogin,function(req,res){
        res.render('seismic_Assessment.html');
    });
 
    // get for partials
 
    app.get('/needAssistancePartialEditable/:id', questionController.Na_WithID_Editable);

    app.get('/questionReadOnlypartial/:id?',questionController.fillreadOnlyPartial);     

    app.get('/questionTypePartial/:id', questionController.fillQuestionPartial);       

    app.get('/needAssistancePartial/:id' , questionController.ShowAssistancePartial);

    app.get('/needAssistancePartialBlank', questionController.ShowAssistancePartialBlank)

    app.get('/questionNewPartial', function(req,res){
        res.render('questionNewPartial.html');
    });

    app.get('/ViewStatistics' , function(req,res){
        res.render('ViewStatistics.html');
    });
  
    //---some post    
    app.post('/Delete_Question' , questionController.Delete_Question);

    app.post('/RemoveQuestionImageArray' , questionController.RemoveQuestionImageArray);

    app.post('/AddQuestionImageArray' , questionController.AddQuestionImageArray);

    app.post('/DynamicImageUpdate' , controller.DynamicImageUpdate);

    app.post('/DynamicVideoUpdate' , controller.DynamicVideoUpdate);

    app.post('/Delete_Questionimg' , questionController.destory);

    app.post('/UpdateQuestions/:Qindex/:TotalCount/:id' , multipartMiddleware , questionController.UpdateQuestions); 

    app.post('/AddNewQuestion/:id?' , multipartMiddleware , questionController.addQuestion); 

    app.post('/saveQuestions', questionController.SaveQuestions);

    app.post('/Delete_img' , controller.destory);

    app.post('/Delete_video' , controller.destory_video);

    app.post('/create', multipartMiddleware, controller.create);
    
    app.post('/test',function(req,res){                                                            
        var buildingType = require("../models/buildingType.js");     
        buildingType.update({_id: req.body["BuildingType"]},{
            name: {"Hindi":req.body["NameHI"],"English":req.body["NameEN"],"Gujarati":req.body["NameGJ"]},
            description : {"Hindi":req.body["DescHI"], "English":req.body["DescEN"] , "Gujarati" : req.body["DescGJ"]}        
            },function(err, test){                  
                if(err){res.send(err)};                  
        });
        res.send(req.body);
    });

    app.post('/login', function(req, res) {
        sess = req.session;
        sess.email = req.body.email;
        res.end('done');
    });

    app.post('/', function(req, res) {          
        res.send('done');       
    });

    app.post('/adminLogin',login.index);
    
    app.get('/admin', function(req, res) {
        sess = req.session;
        if (sess.email) {
            res.write('<h1>Hello ' + sess.email + '</h1><br>');
            res.end('<a href=' + '/logout' + '>Logout</a>');
        } else {
            res.write('<h1>Please login first.</h1>');
            res.end('<a href=' + '/' + '>Login</a>');
        }

    });

    app.get('/logout', function(req, res) {
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
            }
        });
    });

    function requireLogin (req, res, next) {         
        if (!req.session.user) {
            res.redirect('/');
        } else {
            next();
        }
    };

}
