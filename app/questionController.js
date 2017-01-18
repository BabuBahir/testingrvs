var question = require("../models/question.js");
var mongoose = require('mongoose');

module.exports = {
	getQuestions:function(req,res){		 
		question.find({}, function(err, data){   console.log(data[2]);   
			res.render('general_Info-Form',{ rawData: data , QTlength : data.length});
		});      
	},
	fillQuestionPartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('questionTypePartial',{ question: data[2].question.text , questionType: data[2].questionType , rawData : data[2]});
		});
	},
	fillreadOnlyPartial : function(req,res){	 
		question.find({}, function(err, data){   
			res.render('questionreadOnlypartial',{question: data[2].question.text ,questionType: data[2].questionType ,rawData : data[2]}); 
		});
	},  
	UpdateQuestions : function(req,res){   
		question.findOneAndUpdate({_id:req.body["QuestionID"]}, { $set: { 'question.text.Hindi': req.body["NameHI"]} }, { new: true }, function (err, tank) {
            if (err) return handleError(err);  console.log(tank); 
 			res.send(tank);     
        });				 
	},
	ShowAssistancePartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('needAssistancePartial',{question: data[2].question.text ,questionType: data[2].questionType ,rawData : data[2].needAssistance}); 
		});
	}	
};