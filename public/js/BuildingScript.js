angular.module('BuildingApp',['angularFileUpload'])
    .controller('MainCtrl',function ($scope,$http,$document,$upload ) {
 
   $.cloudinary.config({cloud_name: "dcu5hz0re", upload_preset: 'fbesyowr'});  //cloudinary config

{    //constructor
    $scope.selectedTab = "Masonry";
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
}

 	 $scope.check_current_tab = function(){ 	 
   		 switch($scope.selectedTab) {
   		 	case 'Masonry' :
	   		 		$scope.NameEN =$scope.masonaryNameEN;
					$scope.NameGJ =$scope.masonaryNameGJ;
					$scope.NameHI =$scope.masonaryNameHI;

					$scope.DescEN  =$scope.masonaryDescEN;
					$scope.DescHI  =$scope.masonaryDescHI;
					$scope.DescGJ  =$scope.masonaryDescGJ;
			break;
			case  'Rcc'	:
					$scope.NameEN =$scope.rccNameEN;
					$scope.NameGJ =$scope.rccNameGJ;
					$scope.NameHI =$scope.rccNameHI;

					$scope.DescEN  =$scope.rccDescEN;
					$scope.DescHI  =$scope.rccDescHI;
					$scope.DescGJ  =$scope.rccDescGJ;
			break;
			case  'Steel'	:
					$scope.NameEN =$scope.steelNameEN;
					$scope.NameGJ =$scope.steelNameGJ;
					$scope.NameHI =$scope.steelNameHI;

					$scope.DescEN  =$scope.steelDescEN;
					$scope.DescHI  =$scope.steelDescHI;
					$scope.DescGJ  =$scope.steelDescGJ;
			break;
			case  'Composite'	:
					$scope.NameEN =$scope.compoNameEN;
					$scope.NameGJ =$scope.compoNameGJ;
					$scope.NameHI =$scope.compoNameHI;

					$scope.DescEN  =$scope.compoDescEN;
					$scope.DescHI  =$scope.compoDescHI;
					$scope.DescGJ  =$scope.compoDescGJ;
			break;
			default:;
   		 }
  	 };



	$scope.form_validate =function(){
		$scope.check_current_tab();	    	 
		$http({
		method : "POST",
		url : "/test" ,		 
		async : false,
		data:({"NameEN":$scope.NameEN,"NameHI":$scope.NameHI,"NameGJ":$scope.NameGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ , "BuildingType":$scope.selectedTab})
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
			data:({"image_id":img_id  , "BuildingType":$scope.selectedTab })
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
			data:({"video_id":video_id , "BuildingType":$scope.selectedTab })
			}).then(function mySucces(response) {			 
			   //$scope.myWelcome = response.data; 
			    document.getElementById(video_id).style.display = 'none';
			}, function myError(response) {
			  $scope.myWelcome = response.statusText;
			});	 
		};
	};	 

	$scope.current_tab = function(msg){
		$scope.selectedTab = msg;		 
	};

////////////////		// latest /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$scope.$watch('files_1', function () {    //1st Image Watch
		 $scope.upload($scope.files_1, 1 ,'/image');
});

$scope.$watch('files_2', function () {    //2nd Image Watch
		 $scope.upload($scope.files_2, 2 ,'/image');
});

$scope.$watch('files_3', function () {    //3rd  Image Watch
		 $scope.upload($scope.files_3, 3 ,'/image');
});

$scope.$watch('files_4', function () {    //1st Image Watch
		 $scope.upload($scope.files_4, 4 ,'/video');
});

$scope.$watch('files_5', function () {    //2nd Image Watch
		 $scope.upload($scope.files_5, 5 ,'/video');
});

$scope.$watch('files_6', function () {    //3rd  Image Watch
		 $scope.upload($scope.files_6, 6 ,'/video');
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

                }).success(function (data, status, headers, config) { 
                     
                    $scope.UpdateUrl(data , imgIndex , type);                   
	  				  
                    console.log(imgIndex+'file ' + config.file + 'uploaded. Response: ' + data);
 
                });

                
            }
        }
    };





    $scope.UpdateUrl = function(data , imgIndex , type){
    	var imrStr = "ImgMasonSrc_"+imgIndex;
    	var idStr  = "ImgMasonID_"+imgIndex;
    	$scope[imrStr]= (data.url).replace("mp4","jpg") ;    	 
    	$scope[idStr] = data.public_id;

    	var nextImgIndex = imgIndex +1;
    	var divStr ="MasonImgdiv_"+nextImgIndex;
    	$scope[divStr]= true;

    	if(type == '/image'){
    		$scope.DynamicImageUpdate(data , "/DynamicImageUpdate" );
    	} else if (type == '/video') {
    		$scope.DynamicImageUpdate(data , "/DynamicVideoUpdate" );
    	};   	
    };

    //ADD
    $scope.DynamicImageUpdate = function(data , ajaxLoc){

    	$http({
		method : "POST",
		url :  ajaxLoc,		 
		async : false,
		data:({ "selectedTab":$scope.selectedTab , "data":data }) 
		}).then(function mySucces(response) {

		   //$scope.myWelcome = response.data;
		}, function myError(response) {
		  $scope.myWelcome = response.statusText;
		});	

    };



    //DELETE IMAGE
    $scope.DeleteCloudiImage = function(img_id , imgIndex){  

		var r = confirm("Do you want to Delete the Image!");	

		if (r == true) {			 
				$http({
				method : "POST",
				url : "/Delete_img" ,
				async : false,
				data:({"image_id": $scope[img_id] , "BuildingType":$scope.selectedTab })
				}).then(function mySucces(response) {			 
				   //$scope.myWelcome = response.data; 
				    var divStr ="MasonImgdiv_"+imgIndex; 
					$scope[divStr]= false;				 // Hiding that Div

				}, function myError(response) {
				  $scope.myWelcome = response.statusText;
				});	 
		};

    };

    //DELETE VIDEO

    $scope.DeleteCloudiVideo = function(img_id , imgIndex){  

		var r = confirm("Do you want to Delete the Image!");	

		if (r == true) {			 
				$http({
				method : "POST",
				url : "/Delete_video" ,
				async : false,
				data:({"video_id": $scope[img_id] , "BuildingType":$scope.selectedTab })
				}).then(function mySucces(response) {			 
				   //$scope.myWelcome = response.data; 
				    var divStr ="MasonImgdiv_"+imgIndex; 
					$scope[divStr]= false;				 // Hiding that Div

				}, function myError(response) {
				  $scope.myWelcome = response.statusText;
				});	 
		};

    };

});