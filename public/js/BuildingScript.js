angular.module('BuildingApp',[])
    .controller('MainCtrl',function ($scope,$http,$document) {
 
 	//setting values from mongo ejs
 	$scope.masonaryNameGJ =$document[0].getElementById('gjName_masonry').value;
 	$scope.masonaryNameEN =$document[0].getElementById('enName_masonry').value;
 	$scope.masonaryNameHI =$document[0].getElementById('hiName_masonry').value;

 	$scope.masonaryDescEN =$document[0].getElementById('enDesc_masonry').value; 	 
 	$scope.masonaryDescGJ =$document[0].getElementById('gjDesc_masonry').value; 	 
 	$scope.masonaryDescHI =$document[0].getElementById('hiDesc_masonry').value; 

 	$scope.rccNameGJ =$document[0].getElementById('gjName_rcc').value;
 	$scope.rccNameEN =$document[0].getElementById('enName_rcc').value;
 	$scope.rccNameHI =$document[0].getElementById('hiName_rcc').value;

 	$scope.rccDescEN =$document[0].getElementById('enDesc_rcc').value; 	 
 	$scope.rccDescGJ =$document[0].getElementById('gjDesc_rcc').value; 	 
 	$scope.rccDescHI =$document[0].getElementById('hiDesc_rcc').value; 


 	$scope.steelNameGJ =  $document[0].getElementById('gjName_steel').value;
 	$scope.steelNameEN =  $document[0].getElementById('enName_steel').value;
 	$scope.steelNameHI =  $document[0].getElementById('hiName_steel').value;

 	$scope.steelDescEN  =$document[0].getElementById('enDesc_steel').value; 	 
 	$scope.steelDescGJ  =$document[0].getElementById('gjDesc_steel').value; 	 
 	$scope.steelDescHI  =$document[0].getElementById('hiDesc_steel').value; 


 	$scope.compoNameGJ =$document[0].getElementById('gjName_compo').value;
 	$scope.compoNameEN =$document[0].getElementById('enName_compo').value;
 	$scope.compoNameHI =$document[0].getElementById('hiName_compo').value;

 	$scope.compoDescEN =$document[0].getElementById('enDesc_compo').value; 	 
 	$scope.compoDescGJ =$document[0].getElementById('gjDesc_compo').value; 	 
 	$scope.compoDescHI =$document[0].getElementById('hiDesc_compo').value; 	 

	$scope.form_validate =function(){	    	 
		$http({
		method : "POST",
		url : "/test" ,
		async : false,
		data:({"NameEN":$scope.masonaryNameEN,"NameHI":$scope.masonaryNameHI,"NameGJ":$scope.masonaryNameGJ ,"DescEN":$scope.masonaryDescEN , "DescHI":$scope.masonaryDescHI  , "DescGJ":$scope.masonaryDescGJ})
		}).then(function mySucces(response) {

		   //$scope.myWelcome = response.data;
		}, function myError(response) {
		  $scope.myWelcome = response.statusText;
		});	 
	};

	$scope.Delete_img = function(img_id){
		var r = confirm("Do you want to Delete the Image!");	
		if (r == true) {			 
			$http({
			method : "POST",
			url : "/Delete_img" ,
			async : false,
			data:({"image_id":img_id})
			}).then(function mySucces(response) {			 
			   //$scope.myWelcome = response.data; 
			    document.getElementById(img_id).style.display = 'none';
			}, function myError(response) {
			  $scope.myWelcome = response.statusText;
			});	 
		};
	};

	$scope.Delete_video = function(video_id){
		var r = confirm("Do you want to Delete the Video!");	
		if (r == true) {	
			$http({
			method : "POST",
			url : "/Delete_video" ,
			async : false,
			data:({"video_id":video_id})
			}).then(function mySucces(response) {			 
			   //$scope.myWelcome = response.data; 
			    document.getElementById(video_id).style.display = 'none';
			}, function myError(response) {
			  $scope.myWelcome = response.statusText;
			});	 
		};
	};	 

});