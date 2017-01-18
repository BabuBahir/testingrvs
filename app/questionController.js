var question = require("../models/question.js");
var mongoose = require('mongoose');

module.exports = {
	getQuestions:function(req,res){		
		question.find({}, function(err, data){    
			res.render('general_Info-Form',{ question: data[2].question.text , questionType: data[2].questionType});
		});      
	},
	fillQuestionPartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('questionTypePartial',{ question: data[2].question.text , questionType: data[2].questionType , rawData : data[2]});
		});
	},
	fillreadOnlyPartial : function(req,res){
		question.find({}, function(err, data){    
			res.render('questionreadOnlypartial',{ question: data[2].question.text , questionType: data[2].questionType});
		});
	},  
	UpdateQuestions : function(req,res){   

		question.findOneAndUpdate({_id:req.body["QuestionID"]}, { $set: { 'question.text.Hindi': req.body["NameHI"]} }, { new: true }, function (err, tank) {
            if (err) return handleError(err);   
            res.send('done updaete');             
        });				 
	}	
};