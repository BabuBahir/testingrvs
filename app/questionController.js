var question = require("../models/question.js");
var mongoose = require('mongoose');
var pseudoID = Date.now(); 
module.exports = { 
	getQuestions:function(req,res){		 
		question.find({}, function(err, data){   
			res.render('general_Info-Form',{ rawData: data , QTlength : data.length});
		});      
	},
	fillQuestionPartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('questionTypePartial',{ question: data[2].question.text , questionType: data[2].questionType , rawData : data[2]});
		});
	},
	fillreadOnlyPartial : function(req,res){	
		id= req.params.id; 
		question.find({}, function(err, data){ 
			res.render('questionreadOnlypartial',{question: data[id].question.text ,questionType: data[id].questionType ,rawData : data[id]}); 
		});
	},  
	UpdateQuestions : function(req,res){   
		question.findOneAndUpdate({_id:req.body["QuestionID"]}, { $set: { 'question.text.Hindi': req.body["NameHI"]} }, { new: true }, function (err, tank) {
            if (err) return handleError(err);  
 			res.send(tank);     
        });				 
	},
	ShowAssistancePartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('needAssistancePartial',{question: data[2].question.text ,questionType: data[2].questionType ,rawData : data[2].needAssistance}); 
		});
	},

	addQuestion :function(req,res){ 
		var post = new question({questionType: "2", _id: pseudoID, question : { text : { "English" : req.body["NameEN"]}} });

		//save model to MongoDB
		post.save(function (err) {
		  if (err) {
				return err;
		  }
		  else {
		  		res.send(err);
		  	console.log("Post saved");
		  }
		});
	}
};