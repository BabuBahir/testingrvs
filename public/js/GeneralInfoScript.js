 
angular.module('GeneralInfoApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) { 

	$scope.showAssistance=function(){ console.log('4');
		$scope.needAssistanceDiv = !($scope.needAssistanceDiv) ;
	};    	
});