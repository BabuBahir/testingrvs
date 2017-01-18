 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

    $scope.updateTime = Date.now();          

	$scope.btn_click = function(){ 
		$scope.testing = !$scope.testing;
		$scope.Edit_btn = !$scope.Edit_btn;
	};

	$scope.showAssistance=function(){  
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	
 	
 	$scope.form_submit =function(Q_id){  	console.log(Q_id);    
		$http({
		method : "POST",
		url : "/saveQuestions" ,		 
		async : false,
		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ , "QuestionID":Q_id})
		}).then(function mySucces(response) {  console.log(response);
			$scope.btn_click(); //call this function 
		   //$scope.myWelcome = response.data;
		}, function myError(response) {  
		  $scope.myWelcome = response.statusText;
		});	 
	};

});