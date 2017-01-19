var question = require("../models/question.js");
var pseudoID = Date.now(); 

var cloudinary = require('cloudinary'); 

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});

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
		question.findOneAndUpdate({_id:id}, { $set: { 'question.text.Hindi': req.body["NameHI"] , 'question.text.English': req.body["NameEN"] } }, { new: true }, function (err, tank) {
            if (err) return handleError(err);  
                    // call read only partial with id
 			res.send(tank);     
        });				 
	},
	ShowAssistancePartial : function(req,res){
		question.find({}, function(err, data){   
			res.render('needAssistancePartial/needAssistancePartialID',{question: data[2].question.text ,questionType: data[2].questionType ,rawData : data[3].needAssistance}); 
		});
	},
 
	ShowAssistancePartialBlank : function(req,res){
		res.render('needAssistancePartial/needAssistancePartialBlank');
	},
 
	addQuestion :function(req,res){   
		var QTNew = new question({
			questionType: req.body["inlineRadioOptions"], 
			_id: pseudoID,   //current Date_Time to prevent creation of $oid
			question : { 
				  text : { 
							"English" : req.body["QT_English"],
							"Hindi"   : req.body["QT_Hindi"],
							"Gujarati": req.body["QT_Gujarati"]
						}
					},
		  needAssistance : {
	  				description :{
	  						"English" : req.body["NA_DescEnglish"],
							"Hindi"   : req.body["NA_DescHindi"],
							"Gujarati": req.body["NA_DescGujarati"]	
	  				},
	  				title : {
	  						"English" : req.body["NA_NameEnglish"],
							"Hindi"   : req.body["NA_NameHindi"],
							"Gujarati": req.body["NA_NameGujarati"]
	  				},
	  				questionImgUrl : []
			  }


		});		 

		 
 
		if(req.files.image_masonry.type=="image/jpeg") {   // check if image is uploaded... if yes upload to cloudinary..else redirect        
           cloudinary.v2.uploader.upload(req.files.image_masonry.path,
                { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
                function(err, result) {        // call back after uploading image to cloudinary    
                		var element= {}; element.imgUrl= result.url ; element._id =result.public_id;                                                           
                     	QTNew.needAssistance.questionImgUrl.push(element);
						         //save model to MongoDB
						QTNew.save(function (err) {
							if (err) {
								return err;
							}
							else {
								res.redirect('/generalInfo');								 
							}
						});    
                  });
           };                   		
	}
};