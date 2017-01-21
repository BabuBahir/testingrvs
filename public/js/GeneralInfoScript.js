 
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
    	console.log(msg);
    };

	$scope.btn_click = function(Q_id){  
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
    
	$scope.GetDataForReadOnly = function(Q_id){ console.log(Q_id);
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
		data:({"NameEN":$scope.QuestEN,"NameHI":$scope.QuestHI,"NameGJ":$scope.QuestGJ ,"DescEN":$scope.DescEN , "DescHI":$scope.DescHI  , "DescGJ":$scope.DescGJ , "QuestionID":Q_id})
		}).then(function mySucces(response) {	
            $scope.change_READONLY_page(response.data,Q_id);
			$scope.btn_click(Q_id); //call this function  
            location.reload();
		//	location.reload(); // refresh page once   
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

         console.log(ReadOnlyENQues);console.log($document[0].getElementById(ReadOnlyENQues).value);
     };
});