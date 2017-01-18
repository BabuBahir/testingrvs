 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

    $scope.updateTime = Date.now();               
    
    $scope.Add_New = function(){
    	$scope.oldQuestionDiv = !$scope.oldQuestionDiv ;
    };

    $scope.init_checkbox = function(msg){
    	msg= msg.trim();
    	if(msg){
    		$scope.CheckNeedAssistance = true;
    	}else{
    		$scope.CheckNeedAssistance = false;
    	};
    };

	$scope.btn_click = function(){  
		$scope.testing = !$scope.testing;
		$scope.Edit_btn = !$scope.Edit_btn;
	};

	$scope.showAssistance=function(){  
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	
 	
 	$scope.Add_question_fn = function(){ console.log($scope.ENQues);
 		$http({
 			method : "POST",
 			url : "/addQuestion",
 			data: ({"NameEN":$scope.ENQues})
 		}).then(function mySucces(response){
 			 location.reload(); //some action on success
 		});
 	};

 	$scope.form_submit =function(Q_id){  	    
		$http({
		method : "POST",
		url : "/saveQuestions" ,		 		 
		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ , "QuestionID":Q_id})
		}).then(function mySucces(response) {  
		    $scope.Call_Another_Ajax();
			$scope.btn_click(); //call this function 
		   //$scope.myWelcome = response.data;
		}, function myError(response) {  
		  $scope.myWelcome = response.statusText;
		});	 
	};

	$scope.Call_Another_Ajax = function(){
		$http({
		method : "GET",
		url : "/questionReadOnlypartial" ,		 
		async : false
		});
	};

});