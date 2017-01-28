 
angular.module('GeneralInfoApp',[]) 
    .controller('MainCtrl',function ($scope,$http,$document,$rootScope) {         

    $scope.updateTime = Date.now();               
    $scope.QEditID = 'BH';   
     
    $scope.FormDestination = "AddNewQuestion";

    $scope.choices = [{_id: 0}, {_id: 1}];

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length;
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues+"/"+($scope.choices.length+1);   // on edit change form destination         
        $scope.choices.push({'_id':newItemNo});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues+"/"+($scope.choices.length-1);   // on edit change form destination         
        $scope.choices.splice(lastItem);
    };

    $scope.FillChoices  = function(msg) {//filling choices        
       $scope.choices =  JSON.parse(msg) ;       
    };

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
                document.getElementsByClassName(msg).style.display = 'none';
                console.log(msg);  
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
                        "IF_NA_removed" : $scope.needAssistanceDiv
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
});