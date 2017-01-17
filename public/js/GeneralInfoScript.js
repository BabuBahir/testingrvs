 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

    $scope.updateTime = Date.now();     

	$scope.btn_click = function(){
		$scope.testing = true;
		$scope.Edit_btn = true;
	};

	$scope.showAssistance=function(){  
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	
});