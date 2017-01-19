var question = require("../models/question.js");
var mongoose = require('mongoose');
var pseudoID = Date.now(); 
module.exports = { 
	getQuestions:function(req,res){		 
		question.find({}, function(err, data){    

			var newArrayOfID = [];
			for(var i=0;i<data.length;i++) {
				newArrayOfID.push(data[i]._id); // pushing ID of each Question
		    }
			 
			res.render('general_Info-Form',{ rawData: data , QTArray : newArrayOfID});
		});      
	},
	fillQuestionPartial : function(req,res){
		id=req.params.id;   
		question.find({_id:id}, function(err, data){   // data[0] has the requied question
			res.render('questionTypePartial',{ question: data[0].question.text , questionType: data[0].questionType , rawData : data[0]});
		});  
	},
	fillreadOnlyPartial : function(req,res){	 
		id=req.params.id; 
		question.find({_id:id}, function(err, data){  // data[0] has the requied question
			res.render('questionreadOnlypartial',{question: data[0].question.text ,questionType: data[0].questionType ,rawData : data[0]}); 
		});  
	},  
	UpdateQuestions : function(req,res){   
		id=req.body["QuestionID"];
		question.findOneAndUpdate({_id:id}, { $set: { 'question.text.Hindi': req.body["NameHI"]} }, { new: true }, function (err, tank) {
            if (err) return handleError(err);  
                    // call read only partial with id
 			res.send(tank);     
        });				 
	},
	ShowAssistancePartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('needAssistancePartial/needAssistancePartialID',{question: data[2].question.text ,questionType: data[2].questionType ,rawData : data[2].needAssistance}); 
		});
	},
 
	ShowAssistancePartialBlank : function(req,res){
		res.render('needAssistancePartial/needAssistancePartialBlank');
	},

	addQuestion :function(req,res){ 
		var post = new question({questionType: "2", _id: pseudoID, question : { text : { "English" : req.body["NameEN"]}} });
		 console.log(req.body);
		//save model to MongoDB
		/*post.save(function (err) {
		  if (err) {
				return err;
		  }
		  else {
		  		res.send(err);
		  	console.log("Post saved");
		  }
		});*/
	}
};