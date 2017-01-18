 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

    $scope.updateTime = Date.now();          
    $scope.CheckNeedAssistance = true;
    
	$scope.btn_click = function(){  
		$scope.testing = !$scope.testing;
		$scope.Edit_btn = !$scope.Edit_btn;
	};

	$scope.showAssistance=function(){  
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
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