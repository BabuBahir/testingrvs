var question = require("../models/question.js");
      
module.exports = {
	getQuestions:function(req,res){		
		question.find({}, function(err, data){    
			res.render('general_Info-Form',{ question: data[2].question.text , questionType: data[2].questionType});
		});      
	}
};