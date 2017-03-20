 
angular.module('GeneralInfoApp',['angularFileUpload']) 
    .controller('MainCtrl',function ($scope,$http,$document,$rootScope,$upload) {         

 $.cloudinary.config({cloud_name: "dcu5hz0re", upload_preset: 'fbesyowr'});  //cloudinary config

    $scope.updateTime = Date.now();               
    
    $scope.Damagelist = [ { value: 'Nothing' }, { value: 'Yes' }, { value: 'No' } ];
     
    $scope.FormDestination = "AddNewQuestion";

    $scope.choices = [{_id: 0}, {_id: 1}];

    $scope.interpretation = {};

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length;
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues+"/"+($scope.choices.length+1);   // on edit change form destination         
        $scope.choices.push({'_id':newItemNo});
    };

    $scope.addFirstChoice = function(){
        var newItemNo = $scope.choices.length;
        $scope.choices.push({'_id':newItemNo});
    };


    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues+"/"+($scope.choices.length-1);   // on edit change form destination         
        $scope.choices.splice(lastItem);

        $scope.addNewChoice =false;  //hide Add Button
    };

    $scope.FillChoices  = function(msg) {//filling choices        
       $scope.choices =  JSON.parse(msg) ;       
    };

    $scope.DamageFillOption = function(msg , index , Qid) {                    
        var optObj = (JSON.parse(msg));         
        var modelStr = "DamageM" + Qid + index;
        $scope.interpretation[index+1] = ($scope.Damagelist[optObj[index].damageRisk]);     
    }

    $scope.Add_New = function(){
        $scope.choices = [{_id: 0}, {_id: 1}];  // repush 2 default elements
        $scope.FormDestination = "AddNewQuestion";
    	$scope.oldQuestionDiv = !$scope.oldQuestionDiv ;
    }; 

    $scope.radioSelect = function(msg){  
    	if(msg != "textFeild"){                        
    		$scope.OptionDiv = true;
    	}else{
    		$scope.OptionDiv = false;
    	}
    };

    $scope.init_checkbox = function(msg){   
    	msg= msg.trim();
    	if(msg == '1'){
    		$scope.CheckNeedAssistance = true;
    	}else{
    		$scope.CheckNeedAssistance = false;
    	};
    };

    $scope.init_checkbox_EditPage = function(msg){    	 
    	msg= msg.trim();
    	if(msg == '1'){
    		$scope.needAssistanceDiv = $scope.CheckNeedAssistance_editpage = true;
    	}else{
    		$scope.needAssistanceDiv = $scope.CheckNeedAssistance_editpage = false;
    	};
    };

    $scope.Delete_img = function(msg){        
        
    	var r = confirm("Do you want to Delete the Image!");   
        if (r == true) {              
            $http({
            method : "POST",
            url : "/Delete_Questionimg" ,
            async : false,
            data:({"image_id":msg  , "Q_ID":$scope.QEditID})
            }).then(function mySucces(response) {      
               //$scope.myWelcome = response.data; 
                $rootScope[msg] = true;
                 
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
        };   

        $scope.Delete_Video = function(msg){
            var r = confirm("Do you want to Delete the video!");   
        if (r == true) {              
            $http({
            method : "POST",
            url : "/Delete_QuestionVideo" ,
            async : false,
            data:({"image_id":msg  , "Q_ID":$scope.QEditID})
            }).then(function mySucces(response) {      
               //$scope.myWelcome = response.data; 
                $rootScope[msg] = true;
                 
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
        };


	$scope.btn_click = function(Q_id , Q_Type){  
        if(Q_Type != '2') {
            $scope.OptionDiv  = true;         // opion div RESET
        }
        else{
            $scope.choices = [{_id: 0}, {_id: 1}];  // repush 2 default elements
            $scope.OptionDiv  = false; 
        };
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues+"/"+$scope.choices.length;   // on edit change form destination
		$scope.QEditID = Q_id;    
		$scope.testing = !$scope.testing;
		$scope.Edit_btn = !$scope.Edit_btn;
	};

    //Delete Questions
    $scope.Question_delete = function(Q_id){

        var r = confirm("Do you want to Delete this Question !");   
        if (r == true) {              
            $http({
            method : "POST",
            url : "/Delete_Question" ,
            async : false,
            data:({"Q_ID":Q_id})
            }).then(function mySucces(response) {      
               //$scope.myWelcome = response.data;                  
                location.reload();
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
    };


	$scope.showAssistance=function(){           
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	

    $scope.showAssistance_create = function(){
        $scope.needAssistanceDiv_Create = !($scope.needAssistanceDiv_Create) ;
    }; 
    
	$scope.GetDataForReadOnly = function(Q_id,key){ 
        $scope.testing = false;
        $scope.Edit_btn = false;
        $scope.thisQues=key.trim();
		$scope.QEditID = Q_id;         
	};
 	
 	$scope.Add_question_fn = function(){  
 		  // validations
 	};

    $scope.Remove_past = function(msg){
          
    };
 
 	$scope.form_submit =function(Q_id){    
		$http({
    		method : "POST",
    		url : "/saveQuestions" ,	
            async: false, //blocks window close	 		 
    		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ ,"QType": $scope.checkbox ,"QuestionID":Q_id,
                        "NA_NameEN": $rootScope.NA_NameEnglish_edit , "NA_NameHI": $rootScope.NA_NameHindi_edit , "NA_NameGJ": $rootScope.NA_NameGujarati_edit ,
                        "NA_DescEN": $rootScope.NA_DescEnglish_edit , "NA_DescHI" :$rootScope.NA_DescGujarati_edit, "NA_DescGJ" : $rootScope.NA_DescHindi_edit ,
                        "IF_NA_removed" : $scope.needAssistanceDiv  , "CB_U_NPS" : $rootScope.CB_U_NPS , "CB_U_PS" : $rootScope.CB_U_PS , "CB_U_CS" : $rootScope.CB_U_CS ,
                        "CB_IN" : $rootScope.CB_IN , "CB_AM" : $rootScope.CB_AM , "CB_EU" : $rootScope.CB_EU ,
                        "CB_DAMAGE" : $rootScope.CB_DAMAGE
                    })

		}).then(function mySucces(response) {	
            $scope.change_READONLY_page(response.data,Q_id);
			$scope.btn_click(Q_id); //call this function  
             
			///location.reload(); // refresh page once   
		   //$scope.myWelcome = response.data;
		}, function myError(response) {  
		  $scope.myWelcome = response.statusText;
		});	 
	};
 
     $scope.change_READONLY_page = function(msg,Q_id){            // changes value from $scope after every update
        var ReadOnlyENQues= "ReadOnlyENQues"+Q_id;   //checking if first updateTime
        var ReadOnlyGJQues= "ReadOnlyGJQues"+Q_id;
        var ReadOnlyHIQues= "ReadOnlyHIQues"+Q_id;
        
         document.getElementById(ReadOnlyENQues).value = msg.question.text.English;
         document.getElementById(ReadOnlyGJQues).value = msg.question.text.Gujarati;
         document.getElementById(ReadOnlyHIQues).value = msg.question.text.Hindi;

          
     };





////////////////// latest /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 //rootScope Below THis

        //images Masonry
        $rootScope.$watch('files_1', function () {    //1st Image Watch                 
                 $scope.upload($scope.files_1, 1 ,'/image');
        });

        $rootScope.$watch('files_2', function () {    //2nd Image Watch
                 $scope.upload($scope.files_2, 2 ,'/image');
        });

        $rootScope.$watch('files_3', function () {    //3rd  Image Watch
                 $scope.upload($scope.files_3, 3 ,'/image');
        });





$scope.upload = function (files , imgIndex , type) {   
        if (files && files.length) {  
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                console.log(file);
                 
                $upload.upload({
                    url: 'https://api.cloudinary.com/v1_1/'+ $.cloudinary.config().cloud_name +type+'/upload',
                    fields: {'cloud_name': $.cloudinary.config().cloud_name , upload_preset: 'fbesyowr' },
                    file: file
                }).progress(function (evt) {

                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);                      
                    
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);

                    $scope.progressPercentage =progressPercentage;


                }).success(function (data, status, headers, config) { 
                     
                    $scope.progressPercentage =false;

                    $scope.UpdateUrl(data , imgIndex , type);                   
                      
                    console.log(imgIndex+'file ' + config.file + 'uploaded. Response: ' + data);
 
                });

                
            }
        }
    };


    $scope.UpdateUrl = function(data , imgIndex , type){ 
        var imrStr = "ImgMasonSrc_"+imgIndex;
        var idStr  = "ImgMasonID_"+imgIndex;
        $scope[imrStr]= (data.url).replace(".mp4",".jpg") ;        
        $scope[idStr] = data.public_id;

        var nextImgIndex = imgIndex +1;
        var divStr ="MasonImgdiv_"+nextImgIndex;
        $rootScope[divStr]= true;

        if(type == '/image'){
             $scope.DynamicImageUpdate(data , "/AddQuestionImageArray" );
        } else if (type == '/video') {
            ///$scope.DynamicImageUpdate(data , "/DynamicVideoUpdate" );
        };      
    };

    //ADD
    $scope.DynamicImageUpdate = function(data , ajaxLoc){

        $http({
        method : "POST",
        url :  ajaxLoc,      
        async : false,
        data:({ "data":data }) 
        }).then(function mySucces(response) {

           //$scope.myWelcome = response.data;
        }, function myError(response) {
          $scope.myWelcome = response.statusText;
        }); 

    };

///////////////////////

    //Delete 
    $scope.DeleteCloudiImage = function(img_id , imgIndex){
        var r = confirm("Do you want to Delete the Image!");    

        if (r == true) {             
                $http({
                method : "POST",
                url : "/RemoveQuestionImageArray" ,
                async : false,
                data:({"image_id": $scope[img_id] })
                }).then(function mySucces(response) {            
                    var divStr ="MasonImgdiv_"+imgIndex; 
                    $rootScope[divStr]= false;               // Hiding that Div
                    console.log(divStr);
                }, function myError(response) {
                  $scope.myWelcome = response.statusText;
                });  
        };
    }

    ///////////////////////////
    // rootscope change function
    $scope.initUserType = function(index,data)
    {  console.log(data);console.log(index);
        if(data.search('N') > -1 ) {   // N present
            $rootScope[index] = 'N';
        }
        else if(data.search('P') > -1 ) {   // P present
            $rootScope[index] = 'P';
        }
        else if(data.search('C') > -1 ) {   // C present
            $rootScope[index] = 'C';
        };
    }


    //mouseover

    $rootScope.hoverOut = function(){
        console.log('pops');
    }
});