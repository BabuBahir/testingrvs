var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var controller = require('./controller');
var login = require('./login');
var questionController = require('./questionController');
 
 

module.exports = function(app) {
    
    app.get('/', function(req, res) { 
        res.render('admin_Sign-In.html');
    });

    app.get('/user_management',requireLogin,function(req,res){
        res.render('user_Management.html');
    });

    app.get('/index',function(req,res){
        res.render('index.html');
    });

    app.get('/survey',requireLogin, function(req,res){
        res.render('survey_Management.html');
    });  

    app.get('/buildingType',requireLogin,controller.index);

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
  
    //---some post    
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
