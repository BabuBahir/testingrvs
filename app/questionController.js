var question = require("../models/question.js");

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'dcu5hz0re',
    api_key: '812825971867232',
    api_secret: '_pk-gzAhdI63mSU1FDXIkrXkABo'
});
 
  
module.exports = {
        getQuestions: function(req, res) { 
            req.session.forPAge = 'GI'; //setting up Session

            question.find({'forPAge':'GI'}).sort({'_id':-1}).exec(function(err,data){  
                
                var newArrayOfID = [];
                for (var i = 0; i < data.length; i++) {  
                    newArrayOfID.push({id:data[i]._id , Q_Type : data[i].questionType}); // pushing ID of each Question
                }
                 
                res.render('general_Info-Form', { rawData: data, QTArray: newArrayOfID , title: "General Info" });
            });
        }, 
        getQuestions_technical: function(req, res) {
            req.session.forPAge = 'GT'; //setting up Session

           question.find({'forPAge':'GT'}).sort({'_id':-1}).exec(function(err,data){    

                var newArrayOfID = [];
                for (var i = 0; i < data.length; i++) {  
                    newArrayOfID.push({id:data[i]._id , Q_Type : data[i].questionType}); // pushing ID of each Question
                }
                 
                res.render('general_Info-Form', { rawData: data, QTArray: newArrayOfID , title: "General Technical Info" });
            });
        },
        getSurveyQuestions: function(req, res) {
            req.session.forPAge = 'SA'; //setting up Session

            question.find({'forPAge':'SA'}).sort({'_id':-1}).exec(function(err,data){    

                var newArrayOfID = [];
                for (var i = 0; i < data.length; i++) {  
                    newArrayOfID.push({id:data[i]._id , Q_Type : data[i].questionType}); // pushing ID of each Question
                }
                 
                res.render('general_Info-Form', { rawData: data, QTArray: newArrayOfID , title: "Seismic Assessment" });
            });
        },
        fillQuestionPartial: function(req, res) {
            id = req.params.id;  
            question.find({ _id: id }, function(err, data) {  //has the requied question
                res.render('questionTypePartial', { question : data[0].question.text, questionType: data[0].questionType, userTypes: JSON.stringify(data[0].userType), assessmentStds: JSON.stringify(data[0].assessmentStd) , rawData: data[0], Q_id: id  , qOptions : JSON.stringify(data[0].question.options) , buildingTypes : JSON.stringify(data[0].buildingsAssociated) ,damageRisks :  data[0].damageRisk });
            });
        }, 
        fillreadOnlyPartial: function(req, res) {
  
            var people = [
                { model: 'ReadOnlyENQues',name: '<%=question.English%>' },
                { model: 'ReadOnlyGJQues',name: '<%=question.Gujarati%>' }, 
                { model: 'ReadOnlyHIQues',name: '<%=question.Hindi%>' }     ]; 

            id = req.params.id;
            
            if(id != null) {
                question.find({ _id: id }, function(err, data) {   // data[0] has the requied question  
                     
                      people[0].name =(data[0].question.text.English);
                      people[1].name =(data[0].question.text.Gujarati); 
                      people[2].name =(data[0].question.text.Hindi); 
                      
                    res.render('questionreadOnlypartial',{question: data[0].question.text,questionType: data[0].questionType, userTypes: JSON.stringify(data[0].userType), assessmentStds: JSON.stringify(data[0].assessmentStd) , rawData: data[0], Q_id: id , people : people , qOptions : data[0].question.options , buildingTypes : JSON.stringify(data[0].buildingsAssociated) , damageRisks : data[0].damageRisk });
                });
            } else { 
                 question.findOne( {} , function(err, data) {   // data[0] has the requied question  
                     data[0] = data ; 
                      people[0].name =(data[0].question.text.English);
                      people[1].name =(data[0].question.text.Gujarati); 
                      people[2].name =(data[0].question.text.Hindi); 
                      
                    res.render('questionreadOnlypartial',{question: data[0].question.text,questionType: data[0].questionType, userTypes: JSON.stringify(data[0].userType), assessmentStds: JSON.stringify(data[0].assessmentStd) , rawData: data[0], Q_id: id , people : people , qOptions : data[0].question.options , buildingTypes : JSON.stringify(data[0].buildingsAssociated) , damageRisks : data[0].damageRisk });
                });
            };
        },    
  
        Na_WithID_Editable: function(req, res) {  
            id = req.params.id;  
             
            question.find({ _id: id}, function(err, data) { // data[0] has the requied question
                res.render('needAssistancePartial/needAssistanceIDEditable', { rawData: data[0].needAssistance });
            }); 
        },    
    
        UpdateQuestions : function(req,res){ 
            Qindex = req.params.Qindex;    
            Uid = req.params.id;   
            TotalCount = req.params.TotalCount;  
            var OptNameObj = [];//"EditoptEN_0-"+Qindex+'*'+Uid;   // last edited id
            var NewOptions = []; // to get all new options 
            var buildingObj = [];

            console.log(req.body);
            // checking building type(s)  
         if( typeof (req.body["CB_Masonary_edit"]) !== 'undefined') { 
            if (((req.body["CB_Masonary_edit"]) == 'on') || ((req.body["CB_Masonary_edit"][0]) == 'on'))
                buildingObj.push({ _id: 'Masonry' });
        };


        if( typeof (req.body["CB_Rcc_edit"]) !== 'undefined') { 
            if  (((req.body["CB_Rcc_edit"]) == 'on') || ((req.body["CB_Rcc_edit"][0]) == 'on'))                 
                buildingObj.push({ _id: 'Rcc' });
        };

        if( typeof (req.body["CB_Steel_edit"]) !== 'undefined') { 
            if (((req.body["CB_Steel_edit"]) == 'on') || ((req.body["CB_Steel_edit"][0]) == 'on'))                 
                buildingObj.push({ _id: 'Steel' });
        };

        if( typeof (req.body["CB_Compo_edit"]) !== 'undefined') {
            if (((req.body["CB_Compo_edit"]) == 'on') || ((req.body["CB_Compo_edit"][0]) == 'on'))                 
                buildingObj.push({ _id: 'Composite' }); 
        };      
 
///////////////////////////////////////////////////////////////////////////////////////////////////////////
            question.find({ _id: Uid}, function(err, data) {    
                    var optCount = data[0].question.options.length; 
                    for (var i=0 ; i < TotalCount ; i ++) {
                        var ENobj = "Editopt"+'EN_'+i+'-'+Qindex+'*'+Uid;
                        var HIobj = 'Editopt'+'HI_'+i+'-'+Qindex+'*'+Uid; 
                        var GJobj = "Editopt"+'GJ_'+i+'-'+Qindex+'*'+Uid;
                      var DamageObj = "EditDamage_"+i+'-'+Qindex+'*'+Uid;

                         OptNameObj.push({ENobj ,GJobj , HIobj , DamageObj});
                    }; 

                    for(var i =0 ; i < TotalCount ; i ++){   
                        if(i < optCount) {
                            NewOptions.push({_id: i , English : req.body[OptNameObj[i].ENobj][Qindex] ,Gujarati : req.body[OptNameObj[i].GJobj][Qindex] , Hindi : req.body[OptNameObj[i].HIobj][Qindex] , damageRisk : req.body[OptNameObj[i].DamageObj][Qindex] });                                                                   
                        } else {
                            if((Array.isArray(req.body[OptNameObj[i].ENobj])) || (Array.isArray(req.body[OptNameObj[i].GJobj])) || (Array.isArray(req.body[OptNameObj[i].HIobj])) )  {
                                NewOptions.push({_id: i , English : req.body[OptNameObj[i].ENobj][0] ,Gujarati : req.body[OptNameObj[i].GJobj][0], Hindi : req.body[OptNameObj[i].HIobj][0] , damageRisk : req.body[OptNameObj[i].DamageObj][0] });    
                            }                                    
                            else {
                                NewOptions.push({_id: i , English : req.body[OptNameObj[i].ENobj] ,Gujarati : req.body[OptNameObj[i].GJobj], Hindi : req.body[OptNameObj[i].HIobj] , damageRisk : req.body[OptNameObj[i].DamageObj][0] });                                  
                            }
                        }
                    };                      
                    if(data[0].questionType == '2') {NewOptions = []; }; //  if Question Type = 2 .. remove OPTIONS

                    question.findOneAndUpdate({_id: Uid}, { $set: { 'question.options': NewOptions , 'buildingsAssociated' : buildingObj }}, { new: true }, function (err, tank) {
                    if (err) return handleError(err);                               
                         //   res.redirect('/generalInfo');  NEVER RETURN ,, NEVER !!!!
                    });                   
            });         
             
           /////////////////////////////////////////            
            var  imgurlArray = [];  
            req.files.image_masonry[1] = req.files.image_masonry[3] ;    // for time being                   
            if(req.files.image_masonry[1].type=="image/jpeg") {   // check if image is uploaded... if yes upload to cloudinary..else redirect        
            cloudinary.v2.uploader.upload(req.files.image_masonry[1].path,
            { width: 300, height: 300, crop: "limit", tags: req.body.tags, moderation:'manual' },
                function(err, result) {    // call back after uploading image to cloudinary                     
                    question.find({_id:Uid}, function(err, test){   // id changes                                      
                        if(err){res.send(err)};         
                         result.url=result.url.replace("png","jpg");  // replace image to png to jpg to prevent error                   
                        test[0].needAssistance.questionImgUrl.push({imgUrl:result.url,_id:result.public_id});
                        imgurlArray = test[0].needAssistance.questionImgUrl;     

                        //update                                                            
                        question.findOneAndUpdate({_id: Uid}, { $set: { 'needAssistance.questionImgUrl': imgurlArray }}, { new: true }, function (err, tank) {
                        if (err) return handleError(err);                      
                        //   res.redirect('/generalInfo');    //   NEVER RETURN ,, NEVER !!!!
                        }); 
                     
                  });
                });
            };                   

            //video update
            var videourlArray = [];     
            if ((req.files.video_masonry[1].size >0) && (req.files.video_masonry[1].originalFilename  != "" )) { // check if video is present                          
            cloudinary.uploader.upload_large(req.files.video_masonry[1].path, 
            function(result) {  // call back after uploading video to cloudinary 
                result.url=(result.url).replace("mp4","jpg");    // replacing .mp4 by its .jpg   
                  
                question.find({_id: Uid}, function(err, test){                                        
                        if(err){res.send(err)};              

                        test[0].needAssistance.questionVideoUrl.push({videoUrl:result.url,_id:result.public_id});
                        videourlArray = test[0].needAssistance.questionVideoUrl;
                         
                        question.findOneAndUpdate({_id: Uid}, { $set: { 'needAssistance.questionVideoUrl' : videourlArray}}, { new: true }, function (err, tank) {
                        if (err) return handleError(err);                      
                             
                        }); 
                     
                  });               
            }, { resource_type: "video" });  
        };

                 if(req.session.forPAge == 'GI'){
                      res.redirect('/generalInfo');  
                    } else if (req.session.forPAge == 'GT'){
                       res.redirect('/general_techincal');  
                    }else if(req.session.forPAge == 'SA'){
                        res.redirect('/surveyquestions');
                    }; 
        },
  
        SaveQuestions: function(req, res) {   

            if(req.body.IF_NA_removed == false){
                var IF_NA_removed = 0;
            }else if(req.body.IF_NA_removed == true){
                var IF_NA_removed = 1;
            };

            // for user types
            var UserTypeArr = [];
            if(req.body.CB_U_NPS == true){
                UserTypeArr.push({'_id' : "N"});
            };
            if(req.body.CB_U_PS == true){
                UserTypeArr.push({'_id' : "P"});
            };
            if(req.body.CB_U_CS == true){
                UserTypeArr.push({'_id' : "C"});
            };
            // for user types

            //for assessment std
            var assessArr=[];
            if(req.body.CB_IN == true ){
                assessArr.push({'_id' : "General Indian Standard"});
            };
            if(req.body.CB_AM == true ){
                assessArr.push({'_id' : "General American Standard"});
            };
            if(req.body.CB_EU == true ){
                assessArr.push({'_id' : "General European Standard"});
            };
            //for assessment std

            id = req.body["QuestionID"];  
            question.findOneAndUpdate({ _id: id }, { $set: { 'question.text.Hindi': req.body["NameHI"], 'question.text.English': req.body["NameEN"] , 'question.text.Gujarati' : req.body["NameGJ"] , 'questionType' : req.body["QType"] ,
                        'needAssistance.title.English' : req.body["NA_NameEN"] , 'needAssistance.title.Hindi' : req.body["NA_NameHI"] , 'needAssistance.title.Gujarati' : req.body["NA_NameGJ"] ,
                        'needAssistance.description.English' :  req.body["NA_DescEN"] , 'needAssistance.description.Hindi' :  req.body["NA_DescHI"] , 'needAssistance.description.Gujarati' : req.body["NA_DescGJ"] , 'ifNeedAssistance' :IF_NA_removed ,
                        'userType' : UserTypeArr  , assessmentStd : assessArr , 'damageRisk' : req.body.CB_DAMAGE
                    } }, { new: true }, function(err, tank) {   
                if (err) return handleError(err);    
                // call read only partial with id
                res.send(tank);
            });  
        },
        ShowAssistancePartial: function(req, res) {  
            qid = req.params.id;  
            
            if(qid != undefined) {   // if valid id
                 question.findOne( {} , function(err, data) {   // data[0] has the requied question  
                     data[0] = data;  // array to object     
                     res.render('needAssistancePartial/needAssistancePartialID', { question: data[0].question.text, questionType: data[0].questionType, rawData: data[0].needAssistance });
                 });
            } else {
                
                question.find({_id: qid}, function(err, data) {  
                    res.render('needAssistancePartial/needAssistancePartialID', { question: data[0].question.text, questionType: data[0].questionType, rawData: data[0].needAssistance });
                }); 
            };
        },

        ShowAssistancePartialBlank: function(req, res) { 
            res.render('needAssistancePartial/needAssistancePartialBlank');
        },

        addQuestion: function(req, res) {  
                var pseudoID =  Date.now();
                
                var loc = req.files.image_masonry.length -1;
                buildingObj = [];
                optionObj   = [];
                userObj = [];
                StandardObj = [];
               
                // checking question type
                if((req.body["inlineRadioOptions"]) == 'option1') {
                    var Selected_qtType = '0';
                } else if ((req.body["inlineRadioOptions"]) == 'option2') {
                    var Selected_qtType = '1';
                }else {   
                    var Selected_qtType = '2';
                }
                 
                // checking building type(s)  
                if ((req.body["CB_Masonary"]) == 'on')
                    buildingObj.push({ _id: 'Masonry' });

                if ((req.body["CB_Rcc"]) == 'on')
                    buildingObj.push({ _id: 'Rcc' });
 
                if ((req.body["CB_Steel"]) == 'on')
                    buildingObj.push({ _id: 'Steel' });

                if ((req.body["CB_Compo"]) == 'on')
                    buildingObj.push({ _id: 'Composite' });


                //checking Type of user(s)
                if ((req.body["CB_nps"]) == 'on')
                    userObj.push({ _id: 'N' });

                if ((req.body["CB_ps"]) == 'on')
                    userObj.push({ _id: 'P' });
 
                if ((req.body["CB_cs"]) == 'on')
                    userObj.push({ _id: 'C' });


                //checking Type of Standard(s)
                if ((req.body["CB_gis"]) == 'on')
                    StandardObj.push({ _id: 'General Indian Standard' });

                if ((req.body["CB_gas"]) == 'on')
                    StandardObj.push({ _id: 'General American Standard' });
 
                if ((req.body["CB_ges"]) == 'on')
                    StandardObj.push({ _id: 'General European Standard' });


                // putting options in the object
                if(Selected_qtType != '2' && (req.body.opt_EN.length != 'undefined' )) { console.log(req.body.opt_Damage);
                    var optLength = req.body.opt_EN.length;  
                    for(var i=0;i<optLength; i++){ 
                        optionObj.push( { _id : i , English : req.body.opt_EN[i] , Gujarati : req.body.opt_GJ[i] , Hindi : req.body.opt_HI[i] ,  damageRisk :  req.body.opt_Damage[i] } );
                    };
                };

                // Check if needAssistance checkbox is clicked
                if((req.body["CB_NeedAssistance"]) == 'on' ) {
                    var ifNeedAssistance = '1';
                } else {
                    var ifNeedAssistance = '0';
                };
 
                // putting options in the object

                var QTNew = new question({
                    _id: pseudoID, //current Date_Time to prevent creation of $oid
                    questionType : Selected_qtType,
                      forPAge :  req.session.forPAge, //Setting up questions for page sessions
                    question: {
                            text: {
                                "English": req.body["QT_English"],
                                "Hindi": req.body["QT_Hindi"],
                                "Gujarati": req.body["QT_Gujarati"]
                            },
                            options : optionObj
                    },
                    ifNeedAssistance : ifNeedAssistance ,
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
                        questionImgUrl: req.session.imgArrayAddQ
                    },
                    buildingsAssociated: buildingObj,
                    assessmentStd: StandardObj ,
                    userType  :  userObj , 
                    damageRisk  :  req.body.QuestOption  
                });  

                QTNew.save(function(err) {  req.session.imgArrayAddQ = null;   // delete session array
                        if (err) {
                            return err;
                        } else {  
                            // now upload image 
                                   
                            };
                        });
                            //video upload
                      if(req.files.video_masonry.size > 0) {
                            var videourlArray = [];
                            if ((req.files.video_masonry[0].size >0) && (req.files.video_masonry[0].originalFilename  != "" )) {  // check if video is present                          
                                cloudinary.uploader.upload_large(req.files.video_masonry[0].path, 
                                function(result) {  // call back after uploading video to cloudinary 
                                result.url=(result.url).replace("mp4","jpg");    // replacing .mp4 by its .jpg   

                                question.find({_id: pseudoID}, function(err, test){                                        
                                if(err){res.send(err)};              

                                        test[0].needAssistance.questionVideoUrl.push({videoUrl:result.url,_id:result.public_id});
                                        videourlArray = test[0].needAssistance.questionVideoUrl;

                                        question.findOneAndUpdate({_id: pseudoID}, { $set: { 'needAssistance.questionVideoUrl' : videourlArray}}, { new: true }, function (err, tank) {
                                        if (err) return handleError(err);                      
                                            res.redirect('/generalInfo');  
                                        }); 

                                });               
                                }, { resource_type: "video" });  
                            };
                        }
                            //video upload
                             else {
 
                                if(req.session.forPAge == 'GI'){
                                  res.redirect('/generalInfo');  
                                } else if (req.session.forPAge == 'GT'){
                                   res.redirect('/general_techincal');  
                                }else if(req.session.forPAge == 'SA'){
                                    res.redirect('/surveyquestions');
                                };
                            };
    },

    destory: function (req, res) {               
      var imageId = req.body.image_id; Q_id = req.body.Q_ID;  
       
      cloudinary.v2.uploader.destroy(imageId, function (error, result) {   
                question.update({_id: Q_id}, { $pull: { 'needAssistance.questionImgUrl' : { _id : imageId } } },{ safe: true }, function(err, test){                                        
                        if(err){res.send(err)};                                                             
                        res.send("done");
                  });
          });
   },

    destroy_video:function(req,res){
      var imageId = req.body.image_id; Q_id = req.body.Q_ID;  // it is acutally video

      cloudinary.uploader.destroy(imageId, function (error, result) { 
                question.update({_id: Q_id}, { $pull: { 'needAssistance.questionVideoUrl' : { _id : imageId } } },{ safe: true }, function(err, test){                                        
                        if(err){res.send(err)};                                                             
                        res.send("done");
                  });
          }, { resource_type: "video" });
   } ,


   Delete_Question : function(req,res) {
        Q_ID = req.body.Q_ID ;         
        question.find({_id:Q_ID }).remove().exec(
            res.send('Done')
        );   // Delete Question by ID        
   },


   AddQuestionImageArray : function(req,res){
        var result = req.body.data;
        var imgArrayAddQ =  req.session.imgArrayAddQ || [];  
        imgArrayAddQ.push({imgUrl:result.url,_id:result.public_id});
        req.session.imgArrayAddQ = imgArrayAddQ ;   //setting into session 

        res.send('done');
   },

   RemoveQuestionImageArray : function(req,res){
      var imageId = req.body.image_id;  
      cloudinary.v2.uploader.destroy(imageId, function (error, result) {

                res.send('done');
          }); 
   }
}