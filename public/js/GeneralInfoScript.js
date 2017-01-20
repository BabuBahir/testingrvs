 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

    $scope.updateTime = Date.now();               
    $scope.QEditID = 'third';

    $scope.Add_New = function(){
    	$scope.oldQuestionDiv = !$scope.oldQuestionDiv ;
    };

    $scope.radioSelect = function(msg){
    	if(msg != "textFeild"){
    		$scope.OptionDiv = true;
    	}else{
    		$scope.OptionDiv = false;
    	}
    	console.log(msg);
    };

    $scope.init_checkbox = function(msg){
    	msg= msg.trim();
    	if(msg){
    		$scope.CheckNeedAssistance = true;
    	}else{
    		$scope.CheckNeedAssistance = false;
    	};
    };

	$scope.btn_click = function(Q_id){  
		$scope.QEditID = Q_id;    
		$scope.testing = !$scope.testing;
		$scope.Edit_btn = !$scope.Edit_btn;
	};

	$scope.showAssistance=function(){  
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	

	$scope.GetDataForReadOnly = function(Q_id){
		$scope.QEditID = Q_id;
	};
 	
 	$scope.Add_question_fn = function(){  
 		  // validations
 	};

 	$scope.form_submit =function(Q_id){  	    
		$http({
		method : "POST",
		url : "/saveQuestions" ,		 		 
		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ , "QuestionID":Q_id})
		}).then(function mySucces(response) {  		console.log(response.data);
			$scope.btn_click(Q_id); //call this function 
		//	location.reload(); // refresh page once   
		   //$scope.myWelcome = response.data;
		}, function myError(response) {  
		  $scope.myWelcome = response.statusText;
		});	 
	};
 
});