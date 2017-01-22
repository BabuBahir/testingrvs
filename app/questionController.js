var question = require("../models/question.js");
var pseudoID = Date.now();

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});

 
module.exports = {
        getQuestions: function(req, res) {
            question.find({}, function(err, data) {

                var newArrayOfID = [];
                for (var i = 0; i < data.length; i++) {
                    newArrayOfID.push(data[i]._id); // pushing ID of each Question
                }

                res.render('general_Info-Form', { rawData: data, QTArray: newArrayOfID });
            });
        },
        fillQuestionPartial: function(req, res) {
            id = req.params.id;
            question.find({ _id: id }, function(err, data) { // data[0] has the requied question
                res.render('questionTypePartial', { question: data[0].question.text, questionType: data[0].questionType, rawData: data[0], Q_id: id });
            });
        },
        fillreadOnlyPartial: function(req, res) {

            var people = [
                { model: 'ReadOnlyENQues',name: '<%=question.English%>' },
                { model: 'ReadOnlyGJQues',name: '<%=question.Gujarati%>' },
                { model: 'ReadOnlyHIQues',name: '<%=question.Hindi%>' }     ];              
            id = req.params.id;
            question.find({ _id: id }, function(err, data) { // data[0] has the requied question
                  people[0].name =(data[0].question.text.English);
                  people[1].name =(data[0].question.text.Gujarati);
                  people[2].name =(data[0].question.text.Hindi); 
                                   
                res.render('questionreadOnlypartial', { question: data[0].question.text, questionType: data[0].questionType, rawData: data[0], Q_id: id , people : people });
            });
        },

        Na_WithID_Editable: function(req, res) {
            id = req.params.id;  
            question.find({ _id: id}, function(err, data) { // data[0] has the requied question
                res.render('needAssistancePartial/needAssistanceIDEditable', { rawData: data[0].needAssistance });
            });
        }, 

        UpdateQuestions : function(req,res){     
            Uid = req.params.id;   
               var  imgurlArray = [];                     
                if(req.files.image_masonry[0].type=="image/jpeg") {   // check if image is uploaded... if yes upload to cloudinary..else redirect        
               cloudinary.v2.uploader.upload(req.files.image_masonry[0].path,
                    { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
                    function(err, result) {    // call back after uploading image to cloudinary                     
                        question.find({_id:Uid}, function(err, test){   // id changes                                      
                            if(err){res.send(err)};         
                             result.url=result.url.replace("png","jpg");  // replace image to png to jpg to prevent error                   
                            test[0].needAssistance.questionImgUrl.push({imgUrl:result.url,_id:result.public_id});
                            imgurlArray = test[0].needAssistance.questionImgUrl;                                                                 
                            question.findOneAndUpdate({_id: Uid}, { $set: { 'needAssistance.questionImgUrl': imgurlArray}}, { new: true }, function (err, tank) {
                            if (err) return handleError(err);                      
                            //   res.redirect('/generalInfo');    //   NEVER RETURN ,, NEVER !!!!
                            }); 
                         
                      });
                });
            };       
            res.redirect('/generalInfo');
        },
  
        SaveQuestions: function(req, res) {   
            id = req.body["QuestionID"];   
            question.findOneAndUpdate({ _id: id }, { $set: { 'question.text.Hindi': req.body["NameHI"], 'question.text.English': req.body["NameEN"] , 'question.text.Gujarati' : req.body["NameGJ"]} }, { new: true }, function(err, tank) {
                if (err) return handleError(err);   
                // call read only partial with id
                res.send(tank);
            });  
        },
        ShowAssistancePartial: function(req, res) {
            question.find({_id: id}, function(err, data) {   
                res.render('needAssistancePartial/needAssistancePartialID', { question: data[0].question.text, questionType: data[0].questionType, rawData: data[0].needAssistance });
            });
        },

        ShowAssistancePartialBlank: function(req, res) {
            res.render('needAssistancePartial/needAssistancePartialBlank');
        },

        addQuestion: function(req, res) {    

                buildingObj = [];

                if ((req.body["CB_Masonary"]) == 'on')
                    buildingObj.push({ _id: 'Masonry' });

                if ((req.body["CB_Rcc"]) == 'on')
                    buildingObj.push({ _id: 'Rcc' });

                if ((req.body["CB_Steel"]) == 'on')
                    buildingObj.push({ _id: 'Steel' });

                if ((req.body["CB_Compo"]) == 'on')
                    buildingObj.push({ _id: 'Composite' });



                var QTNew = new question({
                    _id: pseudoID, //current Date_Time to prevent creation of $oid
                    question: {
                        text: {
                            "English": req.body["QT_English"],
                            "Hindi": req.body["QT_Hindi"],
                            "Gujarati": req.body["QT_Gujarati"]
                        } 
                    },
                    needAssistance: {
                        description: {
                            "English": req.body["NA_DescEnglish"],
                            "Hindi": req.body["NA_DescHindi"],
                            "Gujarati": req.body["NA_DescGujarati"]
                        },
                        title: {
                            "English": req.body["NA_NameEnglish"],
                            "Hindi": req.body["NA_NameHindi"],
                            "Gujarati": req.body["NA_NameGujarati"]
                        },
                        questionImgUrl: []
                    },
                    buildingsAssociated: buildingObj

                }); 

                QTNew.save(function(err) {
                        if (err) {
                            return err;
                        } else {
                            // now upload image 					
                            if (req.files.image_masonry.type == "image/jpeg") { // check if image is uploaded... if yes upload to cloudinary..else redirect        									
                                cloudinary.v2.uploader.upload(req.files.image_masonry.path, { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation: 'manual' },
                                    function(err, result) { // call back after uploading image to cloudinary    
                                    
                                        question.find({ _id: pseudoID }, function(err, data) { // get last insert  
                                            result.url=result.url.replace("png","jpg");                                     	
                                            data[0].needAssistance.questionImgUrl.push({imgUrl: result.url , _id: result.public_id}); // pushing url from cloudinary
                                            imgurlArray = data[0].needAssistance.questionImgUrl;
                                            
                                            question.findOneAndUpdate({ _id: pseudoID }, { $set: { 'needAssistance.questionImgUrl': imgurlArray } }, { new: true }, function(err, tank) {
                                                if (err) return handleError(err);
                                                 //save model to MongoDB
                                                res.redirect('/generalInfo');
                                            });
                                        });
                                    });
                            } else {
                                  res.redirect('/generalInfo');  
                            };
                        };
                    });
                }
}