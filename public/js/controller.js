angular.module('adbook', [])
  .controller('AdBookCtrl', function($scope,$http) {

  	function refreshPage(){
	  	$http.get("/getContactList").success(function(response){
	  		$scope.contactList=response;
	  		$scope.selcontact=response[0];
	  		$scope.selected=0;
	  		$scope.showDetailsWindow=true;
	  		$scope.showEditWindow=false;
	 		$scope.url="/updateContact";
            //Set suggestion list for first name and last name
	 		$scope.suggestionList=setSuggestionList(response);
	  	});
  	}
  	refreshPage();

 	$scope.showDetails=function(index){
 		$scope.selcontact=$scope.contactList[index];
 		$scope.selected=index;
 		$scope.form=$scope.selcontact;
        $scope.showSuggestion=false;
        $scope.query="";
 	}

 	$scope.editContact=function(){
 		$scope.showDetailsWindow=false;
 		$scope.showEditWindow=true;
 		$scope.form=$scope.selcontact;
 	}

 	$scope.toggleGuess=function(){
        if($scope.query=='') 
        	$scope.showSuggestion=false;
        else 
        	$scope.showSuggestion=true;
    }

    $scope.addContact=function(){
    	$scope.editContact();
    	$scope.url="/addContact";
    	$scope.form="";
    	$scope.selected=-1;
    }

    $scope.addOrUpdate=function(){
    	if($scope.url=="/addContact"){
    		$http.post($scope.url, $scope.form).success(function(response){
    			console.log("Saved");
    			refreshPage();
    		});
    	}else{
            console.log("updates")
            $scope.url="/updateContact";
            $http.post($scope.url, $scope.form).success(function(response){
                console.log("Saved");
                refreshPage();
            });
    	}
    }

    $scope.cancelEdit=function(){
       $scope.showDetailsWindow=true;
        $scope.showEditWindow=false;
    }

    function setSuggestionList(list){
    	var listArry=[];
    	for(item in list){
            var listItem={}
                listItem.index=item;
                listItem.first_name=list[item].first_name;
                listItem.last_name=list[item].last_name;
    		listArry.push(listItem);
    	}
    	return listArry;
    }

 });