(function () {

//TODO This looks like to HOME controller - REFACTOR REQUIRED
var searchController = function(recipeProvider){
	var vm = this;
	vm.message=   "Searching for recipes";


	recipeProvider.getRecipeList()
				.then(
					function(data,status,headers,conf){
						vm.message = data.length > 0 ? "":"No recipes found";
               			vm.recipeList = data;
    		 	 	 },
    		        function (data, status, headers, conf) {
                        vm.page_load_error = "Unexpected error loading recipes: " + status;
                   	}
                   );

};

//only use $scope when you actually need it, use the ViewModel controllerAd approach where you can.

 angular.module("MyRecipeApp").controller("searchController", searchController);


})();