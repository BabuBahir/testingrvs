 
angular.module('GeneralInfoApp',[]) 
    .controller('MainCtrl',function ($scope,$http,$document) {         

    $scope.updateTime = Date.now();               
    $scope.QEditID = 'BH';   
     
    $scope.FormDestination = "AddNewQuestion";

    $scope.choices = [{id: 'choice1'}, {id: 'choice2'}];

    $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length;
        $scope.choices.push({'_id':newItemNo});
    };

    $scope.removeChoice = function() {
        var lastItem = $scope.choices.length-1;
        $scope.choices.splice(lastItem);
    };

    $scope.FillChoices  = function(msg) {//filling choices        
       $scope.choices =  JSON.parse(msg) ;        
    };

    $scope.Add_New = function(){
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
    	if(msg){
    		$scope.CheckNeedAssistance = true;
    	}else{
    		$scope.CheckNeedAssistance = false;
    	};
    };

    $scope.init_checkbox_EditPage = function(msg){    	 
    	msg= msg.trim();
    	if(msg){
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
                document.getElementById(img_id).style.display = 'none';
            }, function myError(response) {
              $scope.myWelcome = response.statusText;
            });  
            };
        };   

	$scope.btn_click = function(Q_id){
        $scope.OptionDiv  = true;         // opion div RESET
        $scope.FormDestination = "UpdateQuestions/"+$scope.thisQues;   // on edit change form destination
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
        $scope.thisQues=key.trim();
		$scope.QEditID = Q_id;         
	};
 	
 	$scope.Add_question_fn = function(){  
 		  // validations
 	};

 	$scope.form_submit =function(Q_id){  
		$http({
		method : "POST",
		url : "/saveQuestions" ,	
        async: false, //blocks window close	 		 
		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ ,"QType": $scope.checkbox ,"QuestionID":Q_id})
		}).then(function mySucces(response) {	
            $scope.change_READONLY_page(response.data,Q_id);
			$scope.btn_click(Q_id); //call this function  
             
			location.reload(); // refresh page once   
		   //$scope.myWelcome = response.data;
		}, function myError(response) {  
		  $scope.myWelcome = response.statusText;
		});	 
	};
 
     $scope.change_READONLY_page = function(msg,Q_id){            // changes value from $scope after every update
        var ReadOnlyENQues= "ReadOnlyENQues"+Q_id;   //checking if first updateTime
        var ReadOnlyGJQues= "ReadOnlyGJQues"+Q_id;
        var ReadOnlyHIQues= "ReadOnlyHIQues"+Q_id;
        
         $document[0].getElementById(ReadOnlyENQues).value = msg.question.text.English;
         $document[0].getElementById(ReadOnlyGJQues).value = msg.question.text.Gujarati;
         $document[0].getElementById(ReadOnlyHIQues).value = msg.question.text.Hindi;

          
     };
});